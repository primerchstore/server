import { addressDelete } from "../helpers/delete/address.delete.js";
import { addressPatch } from "../helpers/patch/address.patch.js";
import { addressPost } from "../helpers/post/address.post.js";
import { addressQuery } from "../helpers/query/address.query.js";
import {
  AddressDeleteResponseType,
  AddressPatchResponseType,
  AddressPatchValidationType,
  AddressPostResponseType,
  AddressPostValidationType,
  AddressQueryResponseType,
  AddressQueryValidationType,
} from "../helpers/types/address.type.js";

export class AddressService {
  static QUERY = async (
    userId: string,
    query: AddressQueryValidationType,
  ): Promise<AddressQueryResponseType> => {
    return addressQuery(userId, query);
  };
  static POST = async (
    userId: string,
    data: AddressPostValidationType,
  ): Promise<AddressPostResponseType> => {
    return addressPost(userId, data);
  };
  static PATCH = async (
    id: string,
    userId: string,
    data: AddressPatchValidationType,
  ): Promise<AddressPatchResponseType> => {
    return addressPatch(id, userId, data);
  };
  static DELETE = async (
    id: string,
    userId: string,
  ): Promise<AddressDeleteResponseType> => {
    return addressDelete(id, userId);
  };
}
