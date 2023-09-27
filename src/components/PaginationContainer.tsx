import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { ApiMeta, Product } from '../model'

const PaginationContainer = () => {
  const { meta } = useLoaderData() as { products: Product[]; meta: ApiMeta }

  const { pageCount, page } = meta.pagination

  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1
  })

  const { search, pathname } = useLocation()

  const navigate = useNavigate()

  const handlePageChange = (pageNumber: number) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', String(pageNumber))
    console.log(search)
    console.log(pathname)
    console.log(pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  if (pageCount < 2) return null

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1

            if (prevPage < 1) prevPage = pageCount
            handlePageChange(prevPage)
          }}
        >
          Prev
        </button>
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              pageNumber === page && 'bg-base-300 border-base-300'
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1

            if (nextPage > pageCount) nextPage = 1
            handlePageChange(nextPage)
          }}
        >
          next
        </button>
      </div>
    </div>
  )
}

export default PaginationContainer
