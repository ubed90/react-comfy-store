import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './features/cart/cartSlice'

// * USer Slice
import userReducer from './features/user/userSlice'

import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
