import { NextFunction, Response, Request } from "express";
import {
  ProductGetResponseType,
  ProductPatchResponseType,
  ProductPostResponseType,
  ProductQueryResponseType,
} from "../helpers/types/product.type.js";
import { ProductService } from "../services/product.service.js";
import { SuccessResponse } from "../helpers/responses/success.response.js";
import { UserRequest } from "../helpers/types/user.type.js";

export class ProductController {
  static QUERY = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result: ProductQueryResponseType = await ProductService.QUERY(
        req.query as any,
      );
      const response = SuccessResponse.QUERY("product", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };

  static GET = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = req.query as any;
      const result: ProductGetResponseType = await ProductService.GET(data);
      const response = SuccessResponse.QUERY("product", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };

  static POST = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result: ProductPostResponseType = await ProductService.POST(
        req.body,
      );
      const response = SuccessResponse.POST("product", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };

  static PATCH = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { productId } = req.params;
      const result: ProductPatchResponseType = await ProductService.PATCH(
        productId as string,
        req.body,
      );
      const response = SuccessResponse.PATCH("product", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };

  static DELETE = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
    } catch (error) {
      next(error);
    }
  };
}
