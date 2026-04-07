import { NextFunction, Response } from "express";
import { UserRequest } from "../helpers/types/user.type.js";
import { auth } from "../libs/auth.js";
import { fromNodeHeaders } from "better-auth/node";
import { ErrorResponseMessage } from "../helpers/responses/error.response.js";
import { UserRole } from "../generated/prisma/index.js";

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    const { message, status } = ErrorResponseMessage.UNAUTHORIZED();
    return res.status(status).json({ message, status });
  }

  req.session = session;
  next();
};

export const protect = (role: UserRole) => {
  return async (req: UserRequest, res: Response, next: NextFunction) => {
    if (req.session?.user.role !== role) {
      const { status, message } = ErrorResponseMessage.FORBIDDEN();
      return res.status(status).json({ status, message });
    }
    next();
  };
};
