import { NextFunction, Response, Request } from "express";
import { SuccessResponse } from "../helpers/responses/success.response.js";
import { UserRequest } from "../helpers/types/user.type.js";
import {
  SizeDeleteResponseType,
  SizePatchResponseType,
  SizePostResponseType,
  SizeQueryResponseType,
} from "../helpers/types/size.type.js";
import { SizeService } from "../services/size.service.js";

export class SizeController {
  static QUERY = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result: SizeQueryResponseType = await SizeService.QUERY(
        req.query as any,
      );
      const response = SuccessResponse.QUERY("size", result);
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
      const result: SizePostResponseType = await SizeService.POST(req.body);
      const response = SuccessResponse.POST("size", result);
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
      const { sizeId } = req.params;
      const result: SizePatchResponseType = await SizeService.PATCH(
        sizeId as string,
        req.body,
      );
      const response = SuccessResponse.PATCH("size", result);
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
      const { sizeId } = req.params;
      const result: SizeDeleteResponseType = await SizeService.DELETE(
        sizeId as string,
      );
      const response = SuccessResponse.DELETE("size", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };
}
