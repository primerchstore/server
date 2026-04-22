import { NextFunction, Response } from "express";
import { UserRequest } from "../helpers/types/user.type.js";
import {
  OrderGetResponseType,
  OrderPostResponseType,
  OrderQueryResponseType,
  OrderUpdateStatusResponseType,
} from "../helpers/types/order.type.js";
import { OrderAdminService, OrderService } from "../services/order.service.js";
import { SuccessResponse } from "../helpers/responses/success.response.js";
import { OrderPreviewResponseType } from "../helpers/responses/order.response.js";

export class OrderController {
  static QUERY = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result: OrderQueryResponseType = await OrderService.QUERY({
        userId: req.session?.user.id!,
        ...req.body,
      });
      const response = SuccessResponse.QUERY("order", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };

  static GET = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result: OrderGetResponseType = await OrderService.GET({
        userId: req.session?.user.id!,
        by: req.query.by as any,
        value: req.query.value as any,
      });
      const response = SuccessResponse.GET("order", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };

  static PREVIEW = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result: OrderPreviewResponseType = await OrderService.PREVIEW({
        userId: req.session?.user.id!,
        promoCodeId: req.query.promoCodeId as string | undefined,
      });
      const response = SuccessResponse.GET("order", result);
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
      const result: OrderPostResponseType = await OrderService.POST({
        userId: req.session?.user.id!,
        ...req.body,
      });
      const response = SuccessResponse.POST("order", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };
}
export class OrderAdminController {
  static QUERY = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result: OrderQueryResponseType = await OrderAdminService.QUERY({
        userId: req.session?.user.id!,
        ...req.body,
      });
      const response = SuccessResponse.QUERY("order", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };

  static GET = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result: OrderGetResponseType = await OrderAdminService.GET({
        by: req.query.by as any,
        value: req.query.value as any,
      });
      const response = SuccessResponse.GET("order", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };

  static UPDATE_STATUS = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result: OrderUpdateStatusResponseType =
        await OrderAdminService.UPDATE_STATUS({
          orderId: req.params.orderId as string,
          ...req.body,
        });
      const response = SuccessResponse.PATCH("order", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };
}
