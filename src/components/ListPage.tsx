import { PAGESIZE_PARAM_KEY, PAGE_PARAM_KEY, PAGE_SIZE } from '@/constants'
import { Pagination } from 'antd'
import React, { memo, FC, useState, useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

type PropsType = {
  total: number
}
const ListPage: FC<PropsType> = memo((props: PropsType) => {
  const { total } = props
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(9)

  // 从url中获取参数
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const page = parseInt(searchParams.get(PAGE_PARAM_KEY) || '') || 1
    const pageSize = parseInt(searchParams.get(PAGESIZE_PARAM_KEY) || '') || PAGE_SIZE
    setPage(page)
    setPageSize(pageSize)
  }, [searchParams])

  // 页码点击后改变事件,跳转页面，改变url参数
  const nav = useNavigate()
  const { pathname } = useLocation()
  function handleChange(page: number, pageSize: number) {
    searchParams.set(PAGE_PARAM_KEY, page.toString())
    searchParams.set(PAGESIZE_PARAM_KEY, pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString()
    })
    console.log(page, pageSize)
  }
  return (
    <div style={{ margin: '10px 0' }}>
      <Pagination current={page} pageSize={pageSize} total={total} onChange={handleChange} />
    </div>
  )
})

export default ListPage
