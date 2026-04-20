import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import client from "prom-client";
import { authMiddleware } from "./auth.js";

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 3 * 1024 * 1024 } });
const port = process.env.PORT || 8080;
const usersByUid = new Map();
const favoritesByUid = new Map();

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
    const existing = usersByUid.get(uid) || {};
    usersByUid.set(uid, {
      ...existing,
      email: email || existing.email || null,
      updatedAt: new Date().toISOString(),
    });
    return res.status(200).json({ synced: true });
  } catch (error) {
    return next(error);
  }
});

app.get("/api/favorites", async (req, res, next) => {
  try {
    const { uid } = req.user;
    return res.json({ movieIds: favoritesByUid.get(uid) || [] });
  } catch (error) {
    return next(error);
  }
});

app.post("/api/favorites", async (req, res, next) => {
  try {
    const { uid } = req.user;
    const rawMovieIds = Array.isArray(req.body?.movieIds) ? req.body.movieIds : [];
    const movieIds = rawMovieIds.filter((id) => Number.isInteger(id));
    favoritesByUid.set(uid, movieIds);
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

    const existing = usersByUid.get(uid) || { email: req.user.email || null };
    usersByUid.set(uid, {
      ...existing,
      profilePicture: file.buffer,
      profilePictureType: file.mimetype,
      updatedAt: new Date().toISOString(),
    });
    return res.status(200).json({ uploaded: true });
  } catch (error) {
    return next(error);
  }
});

app.get("/api/users/profile-picture", async (req, res, next) => {
  try {
    const { uid } = req.user;
    const user = usersByUid.get(uid);
    if (!user?.profilePicture) {
      return res.status(404).json({ message: "Profile picture not found" });
    }

    res.setHeader("Content-Type", user.profilePictureType || "application/octet-stream");
    return res.send(user.profilePicture);
  } catch (error) {
    return next(error);
  }
});

app.use((error, _, res, __) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
