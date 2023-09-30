import { useLoaderData } from 'react-router-dom'
import dayJs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { OrdersResponse } from '../model'

dayJs.extend(advancedFormat)

const OrderList = () => {
  const { data: orders, meta } = useLoaderData() as OrdersResponse
  console.log(orders)

  return (
    <div className="mt-8">
      <h4 className="mb-4 capitalize">Total Orders: {meta.pagination.total}</h4>

      {/* DAISY TABLE */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* HEAD */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Cost</th>
              <th className="hidden sm:block">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const id = order.id
              const { address, name, numItemsInCart, orderTotal, createdAt } =
                order.attributes
              const date = dayJs(createdAt).format('hh:mm a - MMM Do, YYYY')
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{numItemsInCart}</td>
                  <td>{orderTotal}</td>
                  <td className="hidden sm:block">{date}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderList
