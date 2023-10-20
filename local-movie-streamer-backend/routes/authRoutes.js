import express from "express";
import cors from "cors";
import { registerUser, testing } from "../controllers/authControllers.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Middleware

router.use(
  cors({
    // origin: "*",
    origin: "http://10.21.211.106:5173",
    credentials: true,
  })
);

// Testing Route
router.get(`/test`, testing);
// router.post(`/register`, registerUser);

export default router;
