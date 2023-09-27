import { LoaderFunction } from 'react-router-dom'
import {
  Filters,
  PaginationContainer,
  ProductsContainer,
} from '../../components'
import { customFetch } from '../../utils'

// * Producst URL
const url = '/products'

export const loader: LoaderFunction = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ])
  // console.log(params)

  const {
    data: { data: products, meta },
  } = await customFetch.get(url, { params })
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
