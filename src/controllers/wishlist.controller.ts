import { NextFunction, Response } from "express";
import { UserRequest } from "../helpers/types/user.type.js";
import {
  WishlistDeleteResponseType,
  WishlistPostResponseType,
  WishlistQueryResponseType,
} from "../helpers/types/wishlist.type.js";
import { WishlistService } from "../services/wishlist.service.js";
import { SuccessResponse } from "../helpers/responses/success.response.js";

export class WishlistController {
  static QUERY = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result: WishlistQueryResponseType = await WishlistService.QUERY({
        userId: req.session?.user.id!,
        ...(req.query as any),
      });
      const response = SuccessResponse.QUERY("wishlist", result);
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
      const result: WishlistPostResponseType = await WishlistService.POST({
        userId: req.session?.user.id!,
        productId: req.params.productId as string,
      });
      const response = SuccessResponse.POST("wishlist", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };
  static DELETE = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result: WishlistDeleteResponseType = await WishlistService.DELETE({
        userId: req.session?.user.id!,
        productId: req.params.productId as string,
      });
      const response = SuccessResponse.DELETE("wishlist", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };
}
