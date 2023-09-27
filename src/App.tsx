// * Import Router things RR6+
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  HomeLayout,
  Error,
  Login,
  Register,
  Landing,
  Product,
  Products,
  Cart,
  Checkout,
  About,
  Orders,
} from './Pages'
import { ErrorElement } from './components'

// * Loaders
import { loader as landingLoader } from './Pages/Landing'
import { loader as ProductLoader } from './Pages/Products/Product'
import { loader as ProductsLoader } from './Pages/Products/Products'

// * Root Route COnfig
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        loader: landingLoader,
      },
      {
        path: 'products',
        element: <Products />,
        errorElement: <ErrorElement />,
        loader: ProductsLoader,
      },
      {
        path: 'products/:id',
        element: <Product />,
        errorElement: <ErrorElement />,
        loader: ProductLoader,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
  },
])

const App = () => {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
