import { NextFunction, Response, Request } from "express";
import { SuccessResponse } from "../helpers/responses/success.response.js";
import { UserRequest } from "../helpers/types/user.type.js";
import {
  ColourDeleteResponseType,
  ColourPatchResponseType,
  ColourPostResponseType,
  ColourQueryResponseType,
} from "../helpers/types/colour.type.js";
import { ColourService } from "../services/colour.service.js";

export class ColourController {
  static QUERY = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result: ColourQueryResponseType = await ColourService.QUERY(
        req.query as any,
      );
      const response = SuccessResponse.QUERY("colour", result);
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
      const result: ColourPostResponseType = await ColourService.POST(req.body);
      const response = SuccessResponse.POST("colour", result);
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
      const { colourId } = req.params;
      const result: ColourPatchResponseType = await ColourService.PATCH(
        colourId as string,
        req.body,
      );
      const response = SuccessResponse.PATCH("colour", result);
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
      const { colourId } = req.params;
      const result: ColourDeleteResponseType = await ColourService.DELETE(
        colourId as string,
      );
      const response = SuccessResponse.DELETE("colour", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };
}
