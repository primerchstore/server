import { reviewPost } from "../helpers/post/review.post.js";
import {
  ReviewPostResponseType,
  ReviewPostValidationType,
} from "../helpers/types/review.type.js";

export class ReviewService {
  static POST = async (
    data: ReviewPostValidationType,
  ): Promise<ReviewPostResponseType> => {
    return reviewPost(data);
  };
}
