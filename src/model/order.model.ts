export interface OrdersResponse {
  data: Daum[]
  meta: Meta
}

interface Daum {
  id: number
  attributes: Attributes
}

interface Attributes {
  address: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  name: string
  orderTotal: string
  cartItems: CartItem[]
  numItemsInCart: number
}

interface CartItem {
  image: string
  price: string
  title: string
  amount: number
  cartID: string
  company?: string
  productID: number
  productColor?: string
  color?: string
}

interface Meta {
  pagination: Pagination
}

interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}
