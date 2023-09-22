import axios from 'axios'

const productionUrl = 'https://strapi-store-server.onrender.com/api'

export const customFetch = axios.create({
  baseURL: productionUrl,
})

// * Currency Fromatter
export const formatPrice = (price: string) => {
  const dollarsAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(+price / 100)

  return dollarsAmount
}

// * Generate AMount Of Products
export const generateAmountOptions = (number: number) => {
  return Array.from({ length: number }, (_, idx) => {
    const amount = idx + 1
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    )
  })
}
