import { NextFunction, Response, Request } from "express";
import { UserRequest } from "../helpers/types/user.type.js";
import {
  CartVariantAddVariantResponseType,
  CartVariantDeleteVariantResponseType,
  CartVariantQueryResponseType,
  CartVariantUpdateQuantityResponseType,
} from "../helpers/types/cart.types.js";
import { CartService } from "../services/cart.service.js";
import { SuccessResponse } from "../helpers/responses/success.response.js";
export class CartController {
  static QUERY_VARIANT = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result: CartVariantQueryResponseType =
        await CartService.QUERY_VARIANT({
          ...(req.query as any),
          userId: req.session?.user.id,
        });
      const response = SuccessResponse.QUERY("variantCart", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };

  static ADD_VARIANT = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { variantId } = req.params;
      const result: CartVariantAddVariantResponseType =
        await CartService.ADD_VARIANT({
          variantId: variantId as string,
          userId: req.session?.user.id!,
        });
      const response = SuccessResponse.POST("variantCart", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };

  static UPDATE_QUANTITY = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { variantId } = req.params;
      const result: CartVariantUpdateQuantityResponseType =
        await CartService.UPDATE_QUANTITY({
          variantId: variantId as string,
          userId: req.session?.user.id!,
          quantity: req.body.quantity,
        });
      const response = SuccessResponse.PATCH("variantCart", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };

  static DELETE_VARIANT = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { variantId } = req.params;
      const result: CartVariantDeleteVariantResponseType =
        await CartService.DELETE_VARIANT({
          variantId: variantId as string,
          userId: req.session?.user.id!,
        });
      const response = SuccessResponse.DELETE("variantCart", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };
}
