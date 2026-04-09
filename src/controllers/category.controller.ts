import { NextFunction, Response, Request } from "express";
import { UserRequest } from "../helpers/types/user.type.js";
import {
  CategoryPostResponseType,
  CategoryQueryResponseType,
} from "../helpers/types/category.type.js";
import { CategoryService } from "../services/category.service.js";
import { SuccessResponse } from "../helpers/responses/success.response.js";

export class CategoryController {
  static QUERY = async (req: Request, res: Response, next: NextFunction) => {
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
}
