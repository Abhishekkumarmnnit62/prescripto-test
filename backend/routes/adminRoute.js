import express from "express";
import addDoctor from "../controllers/adminController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// POST /api/admin/add-doctor
router.post("/add-doctor", upload.single("image"), addDoctor);

export default router;
