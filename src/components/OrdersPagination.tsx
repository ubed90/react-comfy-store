import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { ApiMeta, Product } from '../model'
import React from 'react'

const OrdersPagination = () => {
  const { meta } = useLoaderData() as { products: Product[]; meta: ApiMeta }

  const { pageCount, page } = meta.pagination

  //   * Not Required
  //   const pages = Array.from({ length: pageCount }, (_, index) => {
  //     return index + 1
  //   })

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

  const addPageButton = ({
    pageNumber,
    activeClass,
  }: {
    pageNumber: number
    activeClass: boolean
  }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeClass && 'bg-base-300 border-base-300'
        }`}
      >
        {pageNumber}
      </button>
    )
  }

  const renderPageBtns = () => {
    const pageButtons: React.JSX.Element[] = []
    // ! First BTN
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }))

    // * DOts
    if (page > 2)
      pageButtons.push(
        <button
          className="btn btn-xs sm:btn-md border-none join-item"
          key="dots-1"
        >
          ...
        </button>
      )

    // * Current Page
    if (page !== 1 && page !== pageCount)
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }))

    if (page < pageCount - 1)
      pageButtons.push(
        <button
          className="btn btn-xs sm:btn-md border-none join-item"
          key="dots-2"
        >
          ...
        </button>
      )

    // ! Last BTN
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    )
    return pageButtons
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
        {renderPageBtns()}
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

export default OrdersPagination