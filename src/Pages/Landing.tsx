import { LoaderFunction } from 'react-router-dom'
import { FeaturedProducts, Hero } from '../components'
import { Product } from '../model'
import { customFetch } from '../utils'
import { QueryClient } from '@tanstack/react-query'

const url = '/products?featured=true'

const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => customFetch.get(url),
}

export const loader =
  (queryClient: QueryClient): LoaderFunction =>
  async (): Promise<{ products: Product[] }> => {
    const {
      data: { data: products },
    } = await queryClient.ensureQueryData(featuredProductsQuery)
    console.log(products)
    return { products: products }
  }

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  )
}

export default Landing
