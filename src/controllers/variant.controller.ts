import { NextFunction, Response, Request } from "express";
import { UserRequest } from "../helpers/types/user.type.js";
import {
  VariantDeleteResponseType,
  VariantGetResponseType,
  VariantPatchResponseType,
  VariantPostResponseType,
  VariantQueryResponseType,
} from "../helpers/types/variant.type.js";
import { VariantService } from "../services/variant.service.js";
import { SuccessResponse } from "../helpers/responses/success.response.js";

export class VariantController {
  static QUERY = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result: VariantQueryResponseType = await VariantService.QUERY(
        req.query as any,
      );
      const response = SuccessResponse.QUERY("variant", result);
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
      const result: VariantGetResponseType = await VariantService.GET(data);
      const response = SuccessResponse.QUERY("variant", result);
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
      const result: VariantPostResponseType = await VariantService.POST(
        req.body,
      );
      const response = SuccessResponse.POST("variant", result);
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
      const { variantId } = req.params;
      const result: VariantPatchResponseType = await VariantService.PATCH(
        variantId as string,
        req.body,
      );
      const response = SuccessResponse.PATCH("variant", result);
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
      const { variantId } = req.params;
      const result: VariantDeleteResponseType = await VariantService.DELETE(
        variantId as string,
      );
      const response = SuccessResponse.DELETE("variant", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };
}
