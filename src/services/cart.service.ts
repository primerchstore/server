import { cartDeleteVariant } from "../helpers/delete/cart.delete.js";
import { cartUpdateQuantity } from "../helpers/patch/cart.patch.js";
import { cartAddVariant } from "../helpers/post/cart.post.js";
import { cartQueryVariant } from "../helpers/query/cart.query.js";
import {
  CartVariantAddVariantResponseType,
  CartVariantAddVariantValidationType,
  CartVariantDeleteValidationType,
  CartVariantDeleteVariantResponseType,
  CartVariantQueryResponseType,
  CartVariantQueryValidationType,
  CartVariantUpdateQuantityResponseType,
  CartVariantUpdateQuantityValidationType,
} from "../helpers/types/cart.types.js";

export class CartService {
  static QUERY_VARIANT = async (
    data: CartVariantQueryValidationType,
  ): Promise<CartVariantQueryResponseType> => {
    return cartQueryVariant(data);
  };

  static ADD_VARIANT = async (
    data: CartVariantAddVariantValidationType,
  ): Promise<CartVariantAddVariantResponseType> => {
    return cartAddVariant(data);
  };

  static UPDATE_QUANTITY = async (
    data: CartVariantUpdateQuantityValidationType,
  ): Promise<CartVariantUpdateQuantityResponseType> => {
    return cartUpdateQuantity(data);
  };

  static DELETE_VARIANT = async (
    data: CartVariantDeleteValidationType,
  ): Promise<CartVariantDeleteVariantResponseType> => {
    return cartDeleteVariant(data);
  };
}
