import { NextFunction, Response } from "express";
import { UserRequest } from "../helpers/types/user.type.js";
import {
  MediaDeleteResponseType,
  MediaPostResponseType,
  MediaQueryResponseType,
} from "../helpers/types/media.type.js";
import { MediaService } from "../services/media.service.js";
import { SuccessResponse } from "../helpers/responses/success.response.js";

export class MediaController {
  static QUERY = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result: MediaQueryResponseType = await MediaService.QUERY(
        req.query as any,
      );
      const response = SuccessResponse.QUERY("media", result);
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
      const result: MediaPostResponseType = await MediaService.POST(req.file);
      const response = SuccessResponse.POST("media", result);
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
      const result: MediaDeleteResponseType = await MediaService.DELETE({
        id: req.params.mediaId as string,
      });
      const response = SuccessResponse.DELETE("media", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };
}
