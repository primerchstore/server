import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { upload } from "../libs/multer.js";
import { MediaController } from "../controllers/media.controller.js";
import { CategoryController } from "../controllers/category.controller.js";
import { ProductController } from "../controllers/product.controller.js";
import { ColourController } from "../controllers/colour.controller.js";
import { SizeController } from "../controllers/size.controller.js";
import { VariantController } from "../controllers/variant.controller.js";
import { AddressAdminController } from "../controllers/address.controller.js";
import { OrderAdminController } from "../controllers/order.controller.js";

const adminRoutes = express.Router();
adminRoutes.use(protect("ADMIN"));

adminRoutes.post("/products", ProductController.POST);
adminRoutes.patch("/products/:productId", ProductController.PATCH);
adminRoutes.delete("/products/:productId", ProductController.DELETE);

adminRoutes.get("/colours/query", ColourController.QUERY);
adminRoutes.post("/colours", ColourController.POST);
adminRoutes.patch("/colours/:colourId", ColourController.PATCH);
adminRoutes.delete("/colours/:colourId", ColourController.DELETE);

adminRoutes.get("/sizes/query", SizeController.QUERY);
adminRoutes.post("/sizes", SizeController.POST);
adminRoutes.patch("/sizes/:sizeId", SizeController.PATCH);
adminRoutes.delete("/sizes/:sizeId", SizeController.DELETE);

adminRoutes.get("/variants/query", VariantController.QUERY);
adminRoutes.get("/variants/get", VariantController.GET);
adminRoutes.post("/variants", VariantController.POST);
adminRoutes.patch("/variants/:variantId", VariantController.PATCH);
adminRoutes.delete("/variants/:variantId", VariantController.DELETE);

adminRoutes.get("/addresses/query", AddressAdminController.QUERY);

adminRoutes.post("/categories", CategoryController.POST);
adminRoutes.patch("/categories/:categoryId", CategoryController.PATCH);
adminRoutes.delete("/categories/:categoryId", CategoryController.DELETE);

adminRoutes.get("/medias/query", MediaController.QUERY);
adminRoutes.post("/medias", upload.single("image"), MediaController.POST);
adminRoutes.post(
  "/medias/bulk",
  upload.array("images", 10),
  MediaController.POST_BULK,
);
adminRoutes.delete("/medias/:mediaId", MediaController.DELETE);

adminRoutes.get("/orders/query", OrderAdminController.QUERY);
adminRoutes.get("/orders/get", OrderAdminController.GET);
adminRoutes.patch(
  "/orders/:orderId/status",
  OrderAdminController.UPDATE_STATUS,
);

export default adminRoutes;
