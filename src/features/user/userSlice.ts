import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { User } from '../../model'

// ? REFACTORED FPOM NAVBAR

// * Themes Available
enum Themes {
  LIGHT = 'winter',
  DARK = 'dracula',
}

// * Get Theme From Local Storage
const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem('theme') || Themes.LIGHT
  document.documentElement.setAttribute('data-theme', theme)
  return theme
}

// * GET USER FORM LOCAL STORAGE
const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user')!) || null
}

const initialState: User = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { jwt, user } = action.payload
      state.user = { ...user, token: jwt }
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    logoutUser: (state) => {
      state.user = null
      localStorage.removeItem('user')
      toast.success('Logged out successfully')
    },
    toggleTheme: (state) => {
      state.theme = state.theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT
      document.documentElement.setAttribute('data-theme', state.theme)
      localStorage.setItem('theme', state.theme)
    },
  },
})

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions

export default userSlice.reducer
