import { FormInput, SubmitBtn } from '../components'
import { ActionFunction, Form, Link, redirect } from 'react-router-dom'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  console.log(data)

  try {
    const response = await customFetch.post('/auth/local/register', data)
    toast.success('Account Created SuccessFully')
    return redirect('/login')
  } catch (error: any) {
    console.log(error)
    const errorMessage =
      error?.response?.data?.error?.message || 'Some Error Occured'
    toast.error(errorMessage)
    return null
  }
}

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          type="text"
          label="username"
          name="username"
          defaultValue=""
        />
        <FormInput type="email" label="email" name="email" defaultValue="" />
        <FormInput
          type="password"
          label="password"
          name="password"
          defaultValue=""
        />
        <div className="mt-4">
          <SubmitBtn text="Register" />
        </div>
        <button type="button" className="btn btn-secondary btn-block">
          Guest User
        </button>
        <p className="text-center">
          Already a Member ?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Login
          </Link>
        </p>
      </Form>
    </section>
  )
}

export default Register
