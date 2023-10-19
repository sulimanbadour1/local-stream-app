import express from "express";
import cors from "cors";
import { testing } from "../controllers/authControllers.js";

const router = express.Router();

// Middleware
router.use(
  cors({
    credentials: true,
    // origin: `http://${process.env.IP_ADDRESS}:5173`,
    origin: "http://localhost:5173",
  })
);

router.get("/", testing);

export default router;
