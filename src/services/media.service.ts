import { uploadToCloudinary } from "../helpers/cloudinary/upload.helper.js";
import { mediaDelete } from "../helpers/delete/media.delete.js";
import { mediaGet } from "../helpers/get/media.get.js";
import { mediaPost, mediaPostBulk } from "../helpers/post/media.post.js";
import { mediaQuery } from "../helpers/query/media.query.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../helpers/responses/error.response.js";
import {
  MediaDeleteResponseType,
  MediaDeleteValidationType,
  MediaGetResponseType,
  MediaGetValidationType,
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
  static GET = async (
    data: MediaGetValidationType,
  ): Promise<MediaGetResponseType> => {
    return mediaGet(data);
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

  static POST_BULK = async (
    files?: Express.Multer.File[],
  ): Promise<MediaPostResponseType[]> => {
    if (!files || files.length === 0) {
      throw new ResponseError(
        ErrorResponseMessage.BAD_REQUEST("no files provided"),
      );
    }
    const uploadPromises = files.map((file) => uploadToCloudinary(file.buffer));
    const uploadResults = await Promise.all(uploadPromises);

    return mediaPostBulk(uploadResults);
  };

  static DELETE = async (
    id: MediaDeleteValidationType,
  ): Promise<MediaDeleteResponseType> => {
    return mediaDelete(id);
  };
}
