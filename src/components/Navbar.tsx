import { useEffect, useState } from 'react'

import { BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs'
import { FaBarsStaggered } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import NavLinks from './NavLinks'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../Store'
import { toggleTheme } from '../features/user/userSlice'

const Navbar = () => {
  const dispatch = useAppDispatch()

  // ! Previous Before REDUX TOOLKIT
  // const [theme, setTheme] = useState<string>(getThemeFromLocalStorage())

  // const handleTheme = () => {
  //   const newTheme = theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT

  //   setTheme(newTheme)
  // }

  // useEffect(() => {
  //   document.documentElement.setAttribute('data-theme', theme)
  //   localStorage.setItem('theme', theme)
  // }, [theme])

  // * AFter REDUX TOOLKIT
  const handleTheme = () => {
    dispatch(toggleTheme())
  }

  const numOfItemsInCart = useSelector(
    (state: RootState) => state.cart.numItemsInCart
  )

  return (
    <nav className="bg-base-200">
      <div className="navbar align-element">
        <div className="navbar-start">
          {/* TITLE */}
          <NavLink
            to="/"
            className="hidden lg:flex btn btn-primary text-3xl items-center"
          >
            C
          </NavLink>

          {/* DROPDONW */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-200 z-[1] rounded-box w-52"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          {/* THEME SETUP */}
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleTheme} />

            <BsSunFill className="swap-on h-4 w-4" />

            <BsMoonFill className="swap-off h-4 w-4" />
          </label>

          {/* CART LINK */}
          <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md ml-4">
            <div className="indicator">
              <BsCart3 className="h-6 w-6" />
              <span className="badge badge-sm badge-primary indicator-item">
                {numOfItemsInCart}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
