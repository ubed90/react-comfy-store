import { Link, Params, useLoaderData } from 'react-router-dom'
import { customFetch, formatPrice, generateAmountOptions } from '../../utils'
import { Product as SingleProduct, cartItem } from '../../model'
import { ChangeEvent, useState } from 'react'
import { useAppDispatch } from '../../Store'
import { addItem } from '../../features/cart/cartSlice'

export const loader = async ({
  params,
}: {
  params: Params
}): Promise<{ product: SingleProduct }> => {
  const {
    data: { data: product },
  } = await customFetch(`/products/${params.id}`)
  return { product }
}

const Product = () => {
  const { product } = useLoaderData() as { product: SingleProduct }

  const {
    attributes: { image, title, price, description, colors, company },
  } = product

  const [productColor, setProductColor] = useState<string>(colors[0])
  const [amount, setAmount] = useState<number>(1)

  const handleAmount = (e: ChangeEvent<HTMLSelectElement>) => {
    setAmount(parseInt(e.target.value))
  }

  const cartProduct: cartItem = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    company,
    productColor,
    amount,
  }

  const dispatch = useAppDispatch()

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }))
  }

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>

      {/* PRODUCT */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{formatPrice(price)}</p>
          <p className="mt-6 leading-8">{description}</p>
          {/* COLORS */}
          <div>
            <h4 className="text-md font-medium tracking-wider capitalize">
              Colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => (
                <button
                  type="button"
                  key={color}
                  className={`badge w-6 h-6 mr-2 ${
                    color === productColor && 'border-2 border-secondary'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setProductColor(color)}
                ></button>
              ))}
            </div>
          </div>

          {/* AMOUNT */}
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="amount">
              <h4 className="text-md font-medium tracking-wider capitalize">
                Amount
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md"
              id="amount"
              value={amount}
              onChange={handleAmount}
            >
              {generateAmountOptions(20)}
            </select>
          </div>

          {/* CART */}
          <div className="mt-10">
            <button
              type="button"
              className="btn btn-secondary btn-md"
              onClick={addToCart}
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Product
