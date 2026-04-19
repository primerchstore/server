import { NextFunction, Response } from "express";
import { UserRequest } from "../helpers/types/user.type.js";
import {
  AddressDeleteResponseType,
  AddressPatchResponseType,
  AddressPostResponseType,
  AddressQueryResponseType,
} from "../helpers/types/address.type.js";
import {
  AddressAdminService,
  AddressService,
} from "../services/address.service.js";
import { SuccessResponse } from "../helpers/responses/success.response.js";

export class AddressController {
  static QUERY = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result: AddressQueryResponseType = await AddressService.QUERY(
        req.session?.user.id!,
        req.query as any,
      );
      const response = SuccessResponse.QUERY("address", result);
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
      const result: AddressPostResponseType = await AddressService.POST(
        req.session?.user.id!,
        req.body,
      );
      const response = SuccessResponse.POST("address", result);
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
      const { addressId } = req.params;
      const result: AddressPatchResponseType = await AddressService.PATCH(
        addressId as string,
        req.session?.user.id!,
        req.body,
      );
      const response = SuccessResponse.PATCH("address", result);
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
      const { addressId } = req.params;
      const result: AddressDeleteResponseType = await AddressService.DELETE(
        addressId as string,
        req.session?.user.id!,
      );
      const response = SuccessResponse.DELETE("address", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export class AddressAdminController {
  static QUERY = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result: AddressQueryResponseType = await AddressAdminService.QUERY(
        req.query as any,
      );
      const response = SuccessResponse.QUERY("address", result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };
}
