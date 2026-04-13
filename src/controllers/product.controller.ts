import { NextFunction, Response, Request } from "express";

export class ProductController {
  static QUERY = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
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
    } catch (error) {
      next(error);
    }
  };

  static POST = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
    } catch (error) {
      next(error);
    }
  };

  static PATCH = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
    } catch (error) {
      next(error);
    }
  };

  static DELETE = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
    } catch (error) {
      next(error);
    }
  };
}
