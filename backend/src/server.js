import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import client from "prom-client";
import { authMiddleware } from "./auth.js";
import { initDb, pool } from "./db.js";

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 3 * 1024 * 1024 } });
const port = process.env.PORT || 8080;

client.collectDefaultMetrics();
const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["route", "method", "status_code"],
  buckets: [50, 100, 200, 300, 500, 1000, 2000],
});

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("combined"));

app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on("finish", () => {
    end({
      route: req.path,
      method: req.method,
      status_code: res.statusCode,
    });
  });
  next();
});

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.get("/metrics", async (_, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.use("/api", authMiddleware);

app.post("/api/users/sync", async (req, res, next) => {
  try {
    const { uid, email } = req.user;
    await pool.query(
      `
        INSERT INTO users (firebase_uid, email)
        VALUES ($1, $2)
        ON CONFLICT (firebase_uid)
        DO UPDATE SET email = EXCLUDED.email, updated_at = NOW()
      `,
      [uid, email]
    );
    return res.status(200).json({ synced: true });
  } catch (error) {
    return next(error);
  }
});

app.get("/api/favorites", async (req, res, next) => {
  try {
    const { uid } = req.user;
    const result = await pool.query(
      `
        SELECT uf.movie_ids
        FROM user_favorites uf
        JOIN users u ON u.id = uf.user_id
        WHERE u.firebase_uid = $1
      `,
      [uid]
    );
    return res.json({ movieIds: result.rows[0]?.movie_ids ?? [] });
  } catch (error) {
    return next(error);
  }
});

app.post("/api/favorites", async (req, res, next) => {
  try {
    const { uid } = req.user;
    const movieIds = Array.isArray(req.body?.movieIds) ? req.body.movieIds : [];

    const userResult = await pool.query("SELECT id FROM users WHERE firebase_uid = $1", [uid]);
    const userId = userResult.rows[0]?.id;
    if (!userId) {
      return res.status(404).json({ message: "User not synced" });
    }

    await pool.query(
      `
        INSERT INTO user_favorites (user_id, movie_ids)
        VALUES ($1, $2::INT[])
        ON CONFLICT (user_id)
        DO UPDATE SET movie_ids = EXCLUDED.movie_ids, updated_at = NOW()
      `,
      [userId, movieIds]
    );
    return res.status(200).json({ updated: true });
  } catch (error) {
    return next(error);
  }
});

app.put("/api/users/profile-picture", upload.single("profilePicture"), async (req, res, next) => {
  try {
    const { uid } = req.user;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No image provided" });
    }

    await pool.query(
      `
        UPDATE users
        SET profile_picture = $1, profile_picture_type = $2, updated_at = NOW()
        WHERE firebase_uid = $3
      `,
      [file.buffer, file.mimetype, uid]
    );
    return res.status(200).json({ uploaded: true });
  } catch (error) {
    return next(error);
  }
});

app.get("/api/users/profile-picture", async (req, res, next) => {
  try {
    const { uid } = req.user;
    const result = await pool.query(
      `
        SELECT profile_picture, profile_picture_type
        FROM users
        WHERE firebase_uid = $1
      `,
      [uid]
    );
    const row = result.rows[0];
    if (!row?.profile_picture) {
      return res.status(404).json({ message: "Profile picture not found" });
    }

    res.setHeader("Content-Type", row.profile_picture_type || "application/octet-stream");
    return res.send(row.profile_picture);
  } catch (error) {
    return next(error);
  }
});

app.use((error, _, res, __) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
});

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize DB", error);
    process.exit(1);
  });
