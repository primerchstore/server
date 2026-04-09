import { categoryPost } from "../helpers/post/category.post.helper.js";
import { categoryQuery } from "../helpers/query/category.query.js";
import {
  CategoryPostResponseType,
  CategoryPostValidationType,
  CategoryQueryResponseType,
  CategoryQueryValidationType,
} from "../helpers/types/category.type.js";

export class CategoryService {
  static QUERY = async (
    query: CategoryQueryValidationType,
  ): Promise<CategoryQueryResponseType> => {
    return categoryQuery(query);
  };
  static POST = async (
    data: CategoryPostValidationType,
  ): Promise<CategoryPostResponseType> => {
    return categoryPost(data);
  };
}
