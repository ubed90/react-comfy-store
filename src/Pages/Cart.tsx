import { useSelector } from 'react-redux'
import { CartItemList, SectionTitle, CartTotals } from '../components'
import { Link } from 'react-router-dom'
import { RootState } from '../Store'

const Cart = () => {
  const user = useSelector((state: RootState) => state.user.user)

  const numOfItemsInCart = useSelector(
    (state: RootState) => state.cart.numItemsInCart
  )

  if (numOfItemsInCart === 0) return <SectionTitle text="Your cart is empty." />

  return (
    <>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemList />
        </div>
        <div className="lg:col-span-4">
          <CartTotals />
          {user ? (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              Proceed to Checkout
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-block mt-8">
              Please Login
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

export default Cart
