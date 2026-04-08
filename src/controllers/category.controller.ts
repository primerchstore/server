import { NextFunction, Response } from "express";
import { UserRequest } from "../helpers/types/user.type.js";
import { CategoryPostResponseType } from "../helpers/types/category.type.js";
import { CategoryService } from "../services/category.service.js";
import { SuccessResponse } from "../helpers/responses/success.response.js";

export class CategoryController {
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
