export interface PagedResult<T> {
  totalCount: number;
  count?: number;
  startAt?: number;
  data: T[];
}

export function isPagedResponse(clazz: PagedResult<any>): clazz is PagedResult<any> {
  return clazz.data instanceof Array && clazz.count != NaN && clazz.totalCount != NaN && clazz.startAt != NaN;
}
