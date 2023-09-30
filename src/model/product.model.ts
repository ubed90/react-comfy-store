export interface Product {
  id: number
  attributes: ProductAttributes
}

export interface ProductAttributes {
  title: string
  company: string
  description: string
  featured: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  category: string
  image: string
  price: string
  shipping: boolean
  colors: string[]
}
