import {
  ActionFunction,
  Form,
  Link,
  redirect,
  useNavigate,
} from 'react-router-dom'

// * Reusable Comps
import { FormInput, SubmitBtn } from '../components'
import { Store } from '@reduxjs/toolkit'
import { customFetch } from '../utils'
import { User } from '../model'
import { toast } from 'react-toastify'
import { RootState, useAppDispatch } from '../Store'
import { loginUser } from '../features/user/userSlice'

export const action =
  (store: Store<RootState>): ActionFunction =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    console.log(data)

    try {
      const { data: userData } = await customFetch.post<{
        jwt: string
        user: User
      }>('/auth/local', data)
      // console.log(userData)
      store.dispatch(loginUser(userData))
      toast.success('LoggedIn Successfully')
      return redirect('/')
    } catch (error: any) {
      console.log(error)
      const errorMessage =
        error?.response?.data?.error?.message || 'Some Error Occured'
      toast.error(errorMessage)
      return null
    }
  }

const Login = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const loginAsGuestUser = async () => {
    try {
      const { data: userData } = await customFetch.post<{
        jwt: string
        user: User
      }>('/auth/local', { identifier: 'test@test.com', password: 'secret' })
      dispatch(loginUser(userData))
      toast.success('LoggedIn Successfully')
      return navigate('/')
    } catch (error: any) {
      console.log(error)
      const errorMessage =
        error?.response?.data?.error?.message || 'Some Error Occured'
      toast.error(errorMessage)
      return null
    }
  }

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          type="email"
          label="email"
          name="identifier"
          defaultValue="test@test.com"
        />
        <FormInput
          type="password"
          label="password"
          name="password"
          defaultValue="secret"
        />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button
          onClick={loginAsGuestUser}
          type="button"
          className="btn btn-secondary btn-block"
        >
          Guest User
        </button>
        <p className="text-center">
          Not a member yet ?{' '}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Register
          </Link>
        </p>
      </Form>
    </section>
  )
}

export default Login
