import { Outlet, useNavigation } from 'react-router-dom'
import { Header, Navbar } from '../components'

const HomeLayout = () => {
  const isLoading = useNavigation().state === 'loading'
  console.log(isLoading)

  return (
    <>
      <Header />
      <Navbar />
      <section className="align-element py-20">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center gap-y-2">
            <span className="loading loading-spinner text-primary text-center w-16 h-16"></span>
            <h5 className="text-lg tracking-wider">Loading...</h5>
          </div>
        ) : (
          <Outlet />
        )}
      </section>
    </>
  )
}

export default HomeLayout
