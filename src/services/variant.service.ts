import { variantDelete } from "../helpers/delete/variant.delete.js";
import { variantGet } from "../helpers/get/variant.get.js";
import { variantPatch } from "../helpers/patch/variant.patch.js";
import { variantPost } from "../helpers/post/variant.post.js";
import { variantQuery } from "../helpers/query/variant.query.js";
import {
  VariantDeleteResponseType,
  VariantGetResponseType,
  VariantGetValidationType,
  VariantPatchResponseType,
  VariantPatchValidationType,
  VariantPostResponseType,
  VariantPostValidationType,
  VariantQueryResponseType,
  VariantQueryValidationType,
} from "../helpers/types/variant.type.js";

export class VariantService {
  static QUERY = async (
    query: VariantQueryValidationType,
  ): Promise<VariantQueryResponseType> => {
    return variantQuery(query);
  };

  static GET = async (
    data: VariantGetValidationType,
  ): Promise<VariantGetResponseType> => {
    return variantGet(data);
  };

  static POST = async (
    data: VariantPostValidationType,
  ): Promise<VariantPostResponseType> => {
    return variantPost(data);
  };

  static PATCH = async (
    id: string,
    data: VariantPatchValidationType,
  ): Promise<VariantPatchResponseType> => {
    return variantPatch(id, data);
  };

  static DELETE = async (id: string): Promise<VariantDeleteResponseType> => {
    return variantDelete(id);
  };
}
