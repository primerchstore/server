import { categoryGet } from "../helpers/get/category.get.js";
import { categoryPost } from "../helpers/post/category.post.js";
import { categoryQuery } from "../helpers/query/category.query.js";
import {
  CategoryGetResponseType,
  CategoryGetValidationType,
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

  static GET = async (
    data: CategoryGetValidationType,
  ): Promise<CategoryGetResponseType> => {
    return categoryGet(data);
  };

  static POST = async (
    data: CategoryPostValidationType,
  ): Promise<CategoryPostResponseType> => {
    return categoryPost(data);
  };
}
