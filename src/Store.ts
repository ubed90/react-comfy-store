import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './features/cart/cartSlice'

import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
