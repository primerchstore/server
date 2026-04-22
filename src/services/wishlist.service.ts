import { wishlistDelete } from "../helpers/delete/wishlist.delete.js";
import { wishlistPost } from "../helpers/post/wishlist.post.js";
import { wishlistQuery } from "../helpers/query/wishlist.query.js";
import {
  WishlistDeleteResponseType,
  WishlistDeleteValidationType,
  WishlistPostResponseType,
  WishlistPostValidationType,
  WishlistQueryResponseType,
  WishlistQueryValidationType,
} from "../helpers/types/wishlist.type.js";

export class WishlistService {
  static QUERY = async (
    query: WishlistQueryValidationType,
  ): Promise<WishlistQueryResponseType> => {
    return wishlistQuery(query);
  };
  static POST = async (
    data: WishlistPostValidationType,
  ): Promise<WishlistPostResponseType> => {
    return wishlistPost(data);
  };
  static DELETE = async (
    data: WishlistDeleteValidationType,
  ): Promise<WishlistDeleteResponseType> => {
    return wishlistDelete(data);
  };
}
