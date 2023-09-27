import { useLoaderData } from 'react-router-dom'
import ProductsGrid from './ProductsGrid'
import ProductsList from './ProductsList'
import { useState } from 'react'
import { BsFillGridFill, BsList } from 'react-icons/bs'
import { Product, ApiMeta } from '../model'

const ProductsContainer = () => {
  const { meta } = useLoaderData() as { products: Product[]; meta: ApiMeta }

  const [layout, setLayout] = useState<string>('grid')

  const setActiveStyles = (pattern: string) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? 'btn-primary text-primary-content'
        : 'btn-ghost text-base-content'
    }`
  }

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <h4 className="font-medium text-md">
          {meta.pagination.total} product{meta.pagination.total > 1 && 's'}
        </h4>
        <div className="flex gap-x-2">
          <button
            type="button"
            onClick={() => setLayout('grid')}
            className={setActiveStyles('grid')}
          >
            <BsFillGridFill />
          </button>
          <button
            type="button"
            onClick={() => setLayout('list')}
            className={setActiveStyles('list')}
          >
            <BsList />
          </button>
        </div>
      </div>

      {/* PRODUCTS */}
      <div>
        {meta.pagination.total === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry No Products matched your search...
          </h5>
        ) : layout === 'grid' ? (
          <ProductsGrid />
        ) : (
          <ProductsList />
        )}
      </div>
    </>
  )
}

export default ProductsContainer
