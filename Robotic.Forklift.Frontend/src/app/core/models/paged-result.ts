export interface PagedResult<T> {
  page: number;
  size: number;
  totalItems: number;
  items: T[];
}