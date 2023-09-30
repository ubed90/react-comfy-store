import { Store } from '@reduxjs/toolkit'
import { RootState } from '../Store'
import {
  LoaderFunction,
  Params,
  redirect,
  useLoaderData,
} from 'react-router-dom'
import { toast } from 'react-toastify'
import { customFetch } from '../utils'
import { OrdersResponse, User } from '../model'
import { OrderList, OrdersPagination, SectionTitle } from '../components'
import { QueryClient } from '@tanstack/react-query'

const ordersQuery = (params: Params, user: User) => {
  return {
    queryKey: [
      'orders',
      user.user?.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch.get('/orders', {
        params,
        headers: {
          Authorization: `Bearer ${user.user?.token}`,
        },
      }),
  }
}

export const loader =
  (store: Store<RootState, any>, queryClient: QueryClient): LoaderFunction =>
  async ({ request }) => {
    const user = store.getState().user.user

    if (!user) {
      toast.warn('Please login First')
      return redirect('/login')
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])

    try {
      const {
        data: { meta, data },
      } = await queryClient.ensureQueryData(
        ordersQuery(params, store.getState().user)
      )

      console.log(meta, data)

      return { data, meta }
    } catch (error: any) {
      console.log(error)
      const errorMessage =
        error?.response?.data?.error?.message || 'Some Error Occured'
      toast.error(errorMessage)

      if (error?.response?.status === 401) return redirect('/login')
      return null
    }
  }

const Orders = () => {
  const { meta } = useLoaderData() as OrdersResponse

  if (meta.pagination.total < 1)
    return <SectionTitle text="No Orders to display!" />

  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrderList />
      <OrdersPagination />
    </>
  )
}

export default Orders
