import { ActionFunction, Form, redirect } from 'react-router-dom'
import FormInput from './FormInput'
import SubmitBtn from './SubmitBtn'
import { customFetch, formatPrice } from '../utils'
import { toast } from 'react-toastify'
import { clearCart } from '../features/cart/cartSlice'
import { Store } from '@reduxjs/toolkit'
import { RootState } from '../Store'
import { QueryClient } from '@tanstack/react-query'

export const action =
  (store: Store<RootState, any>, queryClient: QueryClient): ActionFunction =>
  async ({ request }) => {
    const formData = await request.formData()
    const { name, address } = Object.fromEntries(formData)

    const user = store.getState().user.user
    const { cartItems, orderTotal, numItemsInCart } = store.getState().cart

    const payload = {
      name,
      address,
      cartItems,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(String(orderTotal)),
      numItemsInCart,
    }

    try {
      await customFetch.post(
        '/orders',
        { data: payload },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )

      // ! WE NEED TO CLEAR ORDERS CACHED QUERY WHEN ORDER IS SUCCESSFULL
      queryClient.removeQueries(['orders'])
      store.dispatch(clearCart())
      toast.success('Order Placed SuccessFully')
      return redirect('/orders')
    } catch (error: any) {
      console.log(error)
      const errorMessage =
        error?.response?.data?.error?.message || 'Some Error Occured'
      toast.error(errorMessage)

      if (error.response.status === 401) return redirect('/login')
      return null
    }
  }

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h1 className="font-medium text-xl">SHipping Information</h1>
      <FormInput label="First Name" name="name" type="text" />
      <FormInput label="Address" name="address" type="text" />
      <div className="mt-4">
        <SubmitBtn text="Place Your Order" />
      </div>
    </Form>
  )
}

export default CheckoutForm
