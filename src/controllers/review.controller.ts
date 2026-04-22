import { NextFunction, Response } from "express";
import { UserRequest } from "../helpers/types/user.type.js";
import { ReviewPostResponseType } from "../helpers/types/review.type.js";
import { ReviewService } from "../services/review.service.js";
import { SuccessResponse } from "../helpers/responses/success.response.js";

export class ReviewController {
  static POST = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result: ReviewPostResponseType = await ReviewService.POST({
        userId: req.session?.user.id!,
        ...req.body,
      });
      const response = SuccessResponse.POST("review", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };
}
