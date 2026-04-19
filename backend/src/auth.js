const FIREBASE_LOOKUP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:lookup";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: "Missing auth token" });
    }

    const apiKey = process.env.FIREBASE_WEB_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: "Server auth not configured" });
    }

    const response = await fetch(`${FIREBASE_LOOKUP_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: token }),
    });

    if (!response.ok) {
      return res.status(401).json({ message: "Invalid auth token" });
    }

    const data = await response.json();
    const user = data?.users?.[0];
    if (!user?.localId) {
      return res.status(401).json({ message: "Invalid auth token payload" });
    }

    req.user = {
      uid: user.localId,
      email: user.email || null,
    };

    next();
  } catch (error) {
    next(error);
  }
};
