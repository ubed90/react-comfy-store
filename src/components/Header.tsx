import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RootState, useAppDispatch } from '../Store'
import { clearCart } from '../features/cart/cartSlice'
import { logoutUser } from '../features/user/userSlice'
import { useQueryClient } from '@tanstack/react-query'

const Header = () => {
  const user = useSelector((state: RootState) => state.user.user)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  // * RQ
  const queryClient = useQueryClient()

  const handleLogout = () => {
    navigate('/')
    dispatch(clearCart())
    dispatch(logoutUser())
    queryClient.removeQueries()
  }

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        {user ? (
          // {/* USER */}
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">Hello, {user.username}</p>
            <button
              onClick={handleLogout}
              type="button"
              className="btn btn-xs btn-outline btn-primary"
            >
              Logout
            </button>
          </div>
        ) : (
          // {/* LINKS */}
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign in / Guest
            </Link>
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
