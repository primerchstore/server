import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { upload } from "../libs/multer.js";
import { MediaController } from "../controllers/media.controller.js";

const adminRoutes = express.Router();
adminRoutes.use(protect("ADMIN"));

// Media
adminRoutes.get("/medias/query", MediaController.QUERY);
adminRoutes.post("/medias", upload.single("image"), MediaController.POST);

export default adminRoutes;
