import { uploadToCloudinary } from "../helpers/cloudinary/upload.helper.js";
import { mediaDelete } from "../helpers/delete/media.delete.js";
import { mediaPost } from "../helpers/post/media.post.helper.js";
import { mediaQuery } from "../helpers/query/media.query.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../helpers/responses/error.response.js";
import {
  MediaDeleteResponseType,
  MediaDeleteValidationType,
  MediaPostResponseType,
  MediaQueryResponseType,
  MediaQueryValidationType,
} from "../helpers/types/media.type.js";

export class MediaService {
  static QUERY = async (
    query: MediaQueryValidationType,
  ): Promise<MediaQueryResponseType> => {
    return mediaQuery(query);
  };
  static POST = async (
    file?: Express.Multer.File,
  ): Promise<MediaPostResponseType> => {
    if (!file)
      throw new ResponseError(
        ErrorResponseMessage.BAD_REQUEST("no file provided"),
      );
    const upload = await uploadToCloudinary(file.buffer);
    return mediaPost(upload);
  };

  static DELETE = async (
    id: MediaDeleteValidationType,
  ): Promise<MediaDeleteResponseType> => {
    return mediaDelete(id);
  };
}
