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
    items: ["name", "createdAt", "updatedAt", "hexCode"],
    default: "createdAt",
  };
  static SIZE = {
    items: ["name", "createdAt", "updatedAt", "hexCode"],
    default: "createdAt",
  };
}
