import { categoryDelete } from "../helpers/delete/category.delete.js";
import { categoryGet } from "../helpers/get/category.get.js";
import { categoryPatch } from "../helpers/patch/category.patch.js";
import { categoryPost } from "../helpers/post/category.post.js";
import { categoryQuery } from "../helpers/query/category.query.js";
import {
  CategoryDeleteResponseType,
  CategoryGetResponseType,
  CategoryGetValidationType,
  CategoryPatchResponseType,
  CategoryPatchValidationType,
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

  static PATCH = async (
    id: string,
    data: CategoryPatchValidationType,
  ): Promise<CategoryPatchResponseType> => {
    return categoryPatch(id, data);
  };

  static DELETE = async (id: string): Promise<CategoryDeleteResponseType> => {
    return categoryDelete(id);
  };
}
