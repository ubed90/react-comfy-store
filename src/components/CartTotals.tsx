import { useSelector } from 'react-redux'
import { RootState } from '../Store'
import { formatPrice } from '../utils'

const CartTotals = () => {
  const { cartTotal, shipping, tax, orderTotal } = useSelector(
    (state: RootState) => state.cart
  )

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        {/* SUBTOTAL */}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Subtotal</span>
          <span className="font-medium">
            {formatPrice(cartTotal.toString())}
          </span>
        </p>
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Shipping</span>
          <span className="font-medium">
            {formatPrice(shipping.toString())}
          </span>
        </p>
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Tax</span>
          <span className="font-medium">{formatPrice(tax.toString())}</span>
        </p>
        <p className="flex justify-between text-sm mt-4 pb-2">
          <span>Total</span>
          <span className="font-medium">
            {formatPrice(orderTotal.toString())}
          </span>
        </p>
      </div>
    </div>
  )
}

export default CartTotals
