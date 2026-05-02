import { productDelete } from "../helpers/delete/product.delete.js";
import {
  productGet,
  productGetTotalStock,
} from "../helpers/get/product.get.js";
import { productPatch } from "../helpers/patch/product.patch.js";
import { productPost } from "../helpers/post/product.post.js";
import { productQuery } from "../helpers/query/product.query.js";
import {
  ProductDeleteResponseType,
  ProductGetResponseType,
  ProductGetValidationType,
  ProductPatchResponseType,
  ProductPatchValidationType,
  ProductPostResponseType,
  ProductPostValidationType,
  ProductQueryResponseType,
  ProductQueryValidationType,
  ProductUtilGetTotalStockResponseType,
  ProductUtilGetTotalStockValidationType,
} from "../helpers/types/product.type.js";

export class ProductService {
  static QUERY = async (
    query: ProductQueryValidationType,
  ): Promise<ProductQueryResponseType> => {
    return productQuery(query);
  };

  static GET = async (
    data: ProductGetValidationType,
  ): Promise<ProductGetResponseType> => {
    return productGet(data);
  };

  static POST = async (
    data: ProductPostValidationType,
  ): Promise<ProductPostResponseType> => {
    return productPost(data);
  };

  static PATCH = async (
    id: string,
    data: ProductPatchValidationType,
  ): Promise<ProductPatchResponseType> => {
    return productPatch(id, data);
  };
  static DELETE = async (id: string): Promise<ProductDeleteResponseType> => {
    return productDelete(id);
  };
}

export class ProductUtilService {
  static GET_TOTAL_STOCK = async (
    data: ProductUtilGetTotalStockValidationType,
  ): Promise<ProductUtilGetTotalStockResponseType> => {
    return productGetTotalStock(data);
  };
}
