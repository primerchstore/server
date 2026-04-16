import { sizeDelete } from "../helpers/delete/size.delete.js";
import { sizePatch } from "../helpers/patch/size.patch.js";
import { sizePost } from "../helpers/post/size.post.js";
import { sizeQuery } from "../helpers/query/size.query.js";
import {
  SizeDeleteResponseType,
  SizePatchResponseType,
  SizePatchValidationType,
  SizePostResponseType,
  SizePostValidationType,
  SizeQueryResponseType,
  SizeQueryValidationType,
} from "../helpers/types/size.type.js";

export class SizeService {
  static QUERY = async (
    query: SizeQueryValidationType,
  ): Promise<SizeQueryResponseType> => {
    return sizeQuery(query);
  };
  static POST = async (
    data: SizePostValidationType,
  ): Promise<SizePostResponseType> => {
    return sizePost(data);
  };
  static PATCH = async (
    id: string,
    data: SizePatchValidationType,
  ): Promise<SizePatchResponseType> => {
    return sizePatch(id, data);
  };
  static DELETE = async (id: string): Promise<SizeDeleteResponseType> => {
    return sizeDelete(id);
  };
}
