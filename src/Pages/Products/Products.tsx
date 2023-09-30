import { LoaderFunction, Params } from 'react-router-dom'
import {
  Filters,
  PaginationContainer,
  ProductsContainer,
} from '../../components'
import { customFetch } from '../../utils'
import { QueryClient } from '@tanstack/react-query'

// * Producst URL
const url = '/products'

const allProductsQuery = (params: Params) => {
  const { search, category, company, sort, price, shipping, page } = params

  return {
    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () => customFetch.get(url, { params }),
  }
}

export const loader =
  (queryClient: QueryClient): LoaderFunction =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])
    // console.log(params)

    const {
      data: { data: products, meta },
    } = await queryClient.ensureQueryData(allProductsQuery(params))
    console.log(products, meta)
    return { products, meta, params }
  }

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  )
}

export default Products
