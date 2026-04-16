import { colourDelete } from "../helpers/delete/colour.delete.js";
import { colourPatch } from "../helpers/patch/colour.patch.js";
import { colourPost } from "../helpers/post/colour.post.js";
import { colourQuery } from "../helpers/query/colour.query.js";
import {
  ColourDeleteResponseType,
  ColourPatchResponseType,
  ColourPatchValidationType,
  ColourPostResponseType,
  ColourPostValidationType,
  ColourQueryResponseType,
  ColourQueryValidationType,
} from "../helpers/types/colour.type.js";

export class ColourService {
  static QUERY = async (
    query: ColourQueryValidationType,
  ): Promise<ColourQueryResponseType> => {
    return colourQuery(query);
  };
  static POST = async (
    data: ColourPostValidationType,
  ): Promise<ColourPostResponseType> => {
    return colourPost(data);
  };
  static PATCH = async (
    id: string,
    data: ColourPatchValidationType,
  ): Promise<ColourPatchResponseType> => {
    return colourPatch(id, data);
  };
  static DELETE = async (id: string): Promise<ColourDeleteResponseType> => {
    return colourDelete(id);
  };
}
