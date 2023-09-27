import { Outlet, useNavigation } from 'react-router-dom'
import { Header, Loading, Navbar } from '../components'

const HomeLayout = () => {
  const isLoading = useNavigation().state === 'loading'
  console.log(isLoading)

  return (
    <>
      <Header />
      <Navbar />
      <section className="align-element py-20">
        {isLoading ? <Loading /> : <Outlet />}
      </section>
    </>
  )
}

export default HomeLayout
