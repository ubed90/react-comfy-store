import { useSelector } from 'react-redux'
import { RootState } from '../Store'
import { CartTotals, CheckoutForm, SectionTitle } from '../components'
import { LoaderFunction, redirect } from 'react-router-dom'
import { Store } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const loader =
  (store: Store<RootState, any>): LoaderFunction =>
  () => {
    const isLoggedIn = store.getState().user.user !== null

    if (!isLoggedIn) {
      toast.warn('Please Login First!')
      return redirect('/')
    }

    return null
  }

const Checkout = () => {
  const cartTotal = useSelector((state: RootState) => state.cart.cartTotal)

  if (cartTotal === 0) return <SectionTitle text="Your Cart is Empty" />

  return (
    <>
      <SectionTitle text="Place Your Order" />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  )
}

export default Checkout
