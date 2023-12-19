import React, { memo, FC, useState, ChangeEvent, useEffect } from 'react'
import { Input } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { SEARCH_PARAM_KEY } from '@/constants'

const { Search } = Input

const SearchInfo: FC = memo(() => {
  const { pathname } = useLocation()
  const nav = useNavigate()

  const [text, setText] = useState<string>('')

  // 获取URL参数并设置给搜索框
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const curVal = searchParams.get(SEARCH_PARAM_KEY) || ''
    setText(curVal)
  }, [searchParams])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value)
  }

  const handleSearch = (text: string) => {
    console.log('搜索', text)
    nav({
      pathname,
      search: `?${SEARCH_PARAM_KEY}=${text}`
    })
  }

  return (
    <Search
      placeholder="输入关键字"
      allowClear
      value={text}
      size="large"
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ width: 300 }}
    />
  )
})

export default SearchInfo
