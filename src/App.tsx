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
import { loader as CheckoutLoader } from './Pages/Checkout'
import { loader as OrdersLoader } from './Pages/Orders'

// * ACtions
import { action as RegisterAction } from './Pages/Register'
import { action as LoginAction } from './Pages/Login'
import { action as CheckoutAction } from './components/CheckoutForm'
import { store } from './Store'

// * REACT QUERY
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

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
        loader: landingLoader(queryClient),
      },
      {
        path: 'products',
        element: <Products />,
        errorElement: <ErrorElement />,
        loader: ProductsLoader(queryClient),
      },
      {
        path: 'products/:id',
        element: <Product />,
        errorElement: <ErrorElement />,
        loader: ProductLoader(queryClient),
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
        loader: CheckoutLoader(store),
        action: CheckoutAction(store, queryClient),
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'orders',
        element: <Orders />,
        loader: OrdersLoader(store, queryClient),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: LoginAction(store),
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action: RegisterAction,
  },
])

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
