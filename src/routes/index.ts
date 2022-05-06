import express from "express";
import { protect } from "../middlewares/protectedRoute";
import { helloWorld } from "../controllers";

export const router = express.Router();
router.route("/").get(protect, helloWorld);
