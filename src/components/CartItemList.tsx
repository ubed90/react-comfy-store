import { useSelector } from 'react-redux'
import { RootState } from '../Store'
import CartItem from './CartItem'

const CartItemList = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems)

  return (
    <>
      {cartItems.map((item) => (
        <CartItem key={item.cartID} {...item} />
      ))}
    </>
  )
}

export default CartItemList
