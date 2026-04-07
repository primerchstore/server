import { Request } from "express";
import { auth } from "../../libs/auth.js";

export interface UserRequest extends Request {
  session?: typeof auth.$Infer.Session;
}
