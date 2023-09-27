export interface ApiMeta {
  pagination: Pagination
  categories: string[]
  companies: string[]
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}
