import {
  orderAdminGet,
  orderGet,
  orderPreview,
} from "../helpers/get/order.get.js";
import { orderAdminUpdateStatus } from "../helpers/patch/order.patch.js";
import { orderPost } from "../helpers/post/order.post.js";
import { orderAdminQuery, orderQuery } from "../helpers/query/order.query.js";
import { OrderPreviewResponseType } from "../helpers/responses/order.response.js";
import {
  OrderAdminGetValidationType,
  OrderAdminQueryValidationType,
  OrderGetResponseType,
  OrderGetValidationType,
  OrderPostResponseType,
  OrderPostValidationType,
  OrderPreviewValidationType,
  OrderQueryResponseType,
  OrderQueryValidationType,
  OrderUpdateStatusResponseType,
  OrderUpdateStatusValidationType,
} from "../helpers/types/order.type.js";

export class OrderService {
  static QUERY = async (
    query: OrderQueryValidationType,
  ): Promise<OrderQueryResponseType> => {
    return orderQuery(query);
  };

  static GET = async (
    data: OrderGetValidationType,
  ): Promise<OrderGetResponseType> => {
    return orderGet(data);
  };

  static PREVIEW = async (
    data: OrderPreviewValidationType,
  ): Promise<OrderPreviewResponseType> => {
    return orderPreview(data);
  };

  static POST = async (
    data: OrderPostValidationType,
  ): Promise<OrderPostResponseType> => {
    return orderPost(data);
  };
}

export class OrderAdminService {
  static QUERY = async (
    query: OrderAdminQueryValidationType,
  ): Promise<OrderQueryResponseType> => {
    return orderAdminQuery(query);
  };

  static GET = async (
    data: OrderAdminGetValidationType,
  ): Promise<OrderGetResponseType> => {
    return orderAdminGet(data);
  };

  static UPDATE_STATUS = async (
    data: OrderUpdateStatusValidationType,
  ): Promise<OrderUpdateStatusResponseType> => {
    return orderAdminUpdateStatus(data);
  };
}
