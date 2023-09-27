import { FeaturedProducts, Hero } from '../components'
import { Product } from '../model'
import { customFetch } from '../utils'

const url = '/products?featured=true'

export const loader = async (): Promise<{ products: Product[] }> => {
  const {
    data: { data: products },
  } = await customFetch.get(url)
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
