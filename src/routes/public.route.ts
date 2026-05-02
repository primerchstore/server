import express from "express";
import { CategoryController } from "../controllers/category.controller.js";
import {
  ProductController,
  ProductUtilController,
} from "../controllers/product.controller.js";

const publicRoutes = express.Router();

publicRoutes.get("/products/query", ProductController.QUERY);
publicRoutes.get("/products/get", ProductController.GET);
publicRoutes.get(
  "/products/:productId/stock",
  ProductUtilController.GET_TOTAL_STOCK,
);

publicRoutes.get("/categories/query", CategoryController.QUERY);
publicRoutes.get("/categories/get", CategoryController.GET);

export default publicRoutes;
