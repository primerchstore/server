import { NextFunction, Response, Request } from "express";
import { UserRequest } from "../helpers/types/user.type.js";
import {
  CategoryGetResponseType,
  CategoryPatchResponseType,
  CategoryPostResponseType,
  CategoryQueryResponseType,
} from "../helpers/types/category.type.js";
import { CategoryService } from "../services/category.service.js";
import { SuccessResponse } from "../helpers/responses/success.response.js";

export class CategoryController {
  static QUERY = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result: CategoryQueryResponseType = await CategoryService.QUERY(
        req.query as any,
      );
      const response = SuccessResponse.QUERY("category", result);
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
      const result: CategoryGetResponseType = await CategoryService.GET(data);
      const response = SuccessResponse.QUERY("category", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };
  static POST = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      const result: CategoryPostResponseType = await CategoryService.POST(
        req.body,
      );
      const response = SuccessResponse.POST("category", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };
  static PATCH = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { categoryId } = req.params;
      const result: CategoryPatchResponseType = await CategoryService.PATCH(
        categoryId as string,
        req.body,
      );
      const response = SuccessResponse.PATCH("category", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      console.log({ error });
      next(error);
    }
  };
}
