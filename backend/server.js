import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import seedAdminUser from "./config/seedAdmin.js";
import authRoutes from "./routes/authRoutes.js";
import hackathonRoutes from "./routes/hackathonRoutes.js";

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.warn("JWT_SECRET is not set. Add it to backend/.env before running in production.");
}

await connectDB();
await seedAdminUser();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hack-Tracker API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/hackathons", hackathonRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
