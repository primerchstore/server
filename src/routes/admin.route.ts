import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { upload } from "../libs/multer.js";
import { MediaController } from "../controllers/media.controller.js";
import { CategoryController } from "../controllers/category.controller.js";

const adminRoutes = express.Router();
adminRoutes.use(protect("ADMIN"));

adminRoutes.post("/categories", CategoryController.POST);
adminRoutes.patch("/categories/:categoryId", CategoryController.PATCH);
adminRoutes.delete("/categories/:categoryId", CategoryController.DELETE);

adminRoutes.get("/medias/query", MediaController.QUERY);
adminRoutes.post("/medias", upload.single("image"), MediaController.POST);
adminRoutes.delete("/medias/:mediaId", MediaController.DELETE);

export default adminRoutes;
