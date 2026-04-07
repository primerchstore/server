export type Pagination = {
  page: number;
  limit: number;
  totalItems: number;
  totalFilters: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};
