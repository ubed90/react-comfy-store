import { createSlice } from '@reduxjs/toolkit'
import { CartState, cartItem } from '../../model'
import { toast } from 'react-toastify'

const initialState: CartState = {
  cartItems: [],
  cartTotal: 0,
  numItemsInCart: 0,
  shipping: 0,
  orderTotal: 0,
  tax: 0,
}

const getCartFromLocalStorage = () => {
  return (
    (JSON.parse(localStorage.getItem('cart')!) as CartState) || initialState
  )
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage,
  reducers: {
    addItem: (state, { payload }) => {
      const { product } = payload
      const item = state.cartItems.find((i) => i.cartID === product.cartID)
      if (item) {
        item.amount += product.amount
      } else {
        state.cartItems.push(product)
      }

      state.numItemsInCart += product.amount
      state.cartTotal += +product.price * product.amount
      cartSlice.caseReducers.calculateTotals(state)
      toast.success('Item added to cart')
    },
    clearCart: () => {
      localStorage.setItem('cart', JSON.stringify(initialState))
      return initialState
    },
    removeItem: (state, action) => {
      const { cartID } = action.payload
      const product = state.cartItems.find((i) => i.cartID === cartID)
      if (!product) {
        return
      }
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID)
      state.numItemsInCart -= product.amount
      state.cartTotal -= +product.price * product.amount
      cartSlice.caseReducers.calculateTotals(state)
      toast.success('Item removed to cart')
    },
    editItem: (state, action) => {
      const { cartID, amount } = action.payload

      const item = state.cartItems.find((i) => i.cartID === cartID)

      if (!item) return

      state.numItemsInCart += amount - item.amount
      state.cartTotal += +item.price * (amount - item.amount)
      item.amount = amount
      cartSlice.caseReducers.calculateTotals(state)
      toast.success('Cart Updated')
    },
    calculateTotals: (state: CartState) => {
      console.log('Executed')
      state.tax = 0.1 * state.cartTotal
      state.orderTotal = state.cartTotal + state.shipping + state.tax
      localStorage.setItem('cart', JSON.stringify(state))
    },
  },
})

export const { addItem, clearCart, editItem, removeItem } = cartSlice.actions

export default cartSlice.reducer
