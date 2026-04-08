import { categoryPost } from "../helpers/post/category.post.helper.js";
import {
  CategoryPostResponseType,
  CategoryPostValidationType,
} from "../helpers/types/category.type.js";

export class CategoryService {
  static POST = async (
    data: CategoryPostValidationType,
  ): Promise<CategoryPostResponseType> => {
    return categoryPost(data);
  };
}
