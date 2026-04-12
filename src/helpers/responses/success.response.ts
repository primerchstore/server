import { ApiResponse } from "../types/api.type.js";
import { Schema } from "../types/schema.type.js";
import { SuccessResponseApi } from "./api.response.js";

export class SuccessResponse {
  static QUERY = (schema: Schema, result: any): ApiResponse => {
    const { message, status, success } = SuccessResponseApi.QUERY(schema);
    return { message, statusCode: status, success, result };
  };
  static POST = (schema: Schema, result: any): ApiResponse => {
    const { message, status, success } = SuccessResponseApi.POST(schema);
    return { message, statusCode: status, success, result };
  };
  static DELETE = (schema: Schema, result: any): ApiResponse => {
    const { message, status, success } = SuccessResponseApi.DELETE(schema);
    return { message, statusCode: status, success, result };
  };
  static PATCH = (schema: Schema, result: any): ApiResponse => {
    const { message, status, success } = SuccessResponseApi.PATCH(schema);
    return { message, statusCode: status, success, result };
  };
}
