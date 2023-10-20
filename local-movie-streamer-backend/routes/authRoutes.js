import express from "express";
import cors from "cors";
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  testing,
} from "../controllers/authControllers.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Middleware

router.use(
  cors({
    // origin: "*",
    origin: "http://10.21.211.106:5173", // Change this to your frontend URL
    credentials: true,
  })
); // Enable preflight request for all routes

// Testing Route
router.get(`/test`, testing);
router.post(`/register`, registerUser);
router.post(`/login`, loginUser);
router.get(`/profile`, getProfile);
router.post(`/logout`, logoutUser);

export default router;
