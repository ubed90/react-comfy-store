export interface CartState {
  cartItems: cartItem[]
  numItemsInCart: number
  cartTotal: number
  shipping: number
  tax: number
  orderTotal: number
}

export interface cartItem {
  cartID: string
  productID: number
  image: string
  title: string
  price: string
  company: string
  productColor: string
  amount: number
}
