export class Sort {
  static MEDIA = { items: ["createdAt", "updatedAt"], default: "createdAt" };
  static CATEGORY = {
    items: ["name", "productCount", "createdAt", "updatedAt"],
    default: "createdAt",
  };
  static PRODUCT = {
    items: ["name", "createdAt", "updatedAt", "sold"],
    default: "createdAt",
  };
  static COLOUR = {
    items: ["name", "createdAt", "updatedAt", "hexCode", "variant"],
    default: "createdAt",
  };
  static SIZE = {
    items: ["name", "createdAt", "updatedAt", "hexCode"],
    default: "createdAt",
  };
  static VARIANT = {
    items: ["name", "createdAt", "updatedAt", "stock"],
    default: "createdAt",
  };
  static ADDRESS = {
    items: [
      "recipient",
      "createdAt",
      "updatedAt",
      "phone",
      "street",
      "city",
      "province",
      "postalCode",
    ],
    default: "createdAt",
  };
  static VARIANT_IN_CART = {
    items: ["createdAt", "updatedAt"],
    default: "createdAt",
  };
  static ORDER_USER = {
    items: ["createdAt", "updatedAt"],
    default: "createdAt",
  };
  static WISHLIST = {
    items: ["createdAt", "updatedAt"],
    default: "createdAt",
  };
}
