import QuestionCard from '@/components/QuestionCard'
import React, { memo, FC, useState, useEffect, useRef, useMemo } from 'react'
import styles from './Common.module.scss'
import { Empty, message, Spin } from 'antd'
import SearchInfo from '@/components/SearchInfo'
import { useSearchParams } from 'react-router-dom'
import { useDebounceFn, useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'
import { PAGE_SIZE, SEARCH_PARAM_KEY } from '../../constants/index'

const List: FC = memo(() => {
  // const { data = {}, loading } = useLoadQuestionListData()
  // const { list = [], total = 0 } = data
  const [started, setStarted] = useState(false)
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  // 是否还有数据
  const isHaveMoreData = total > list.length
  const [searchParams] = useSearchParams()

  const keyword = searchParams.get(SEARCH_PARAM_KEY) || ''

  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])
  //获取数据
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: PAGE_SIZE,
        keyword
      })
      console.log(data)
      return data
    },
    {
      manual: true,
      onSuccess(res) {
        const { list: l = [], total = 0 } = res
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      }
    }
  )

  // 加载函数 防抖处理
  useEffect(() => {
    tryLoadMore() //第一次加载，初始化
  }, [searchParams])

  // 尝试去触发加载 - 防抖
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem == null) return
      const domRect = elem.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      if (bottom <= 850) {
        setStarted(true)
        console.log('到达底部')
        load() // 真正加载数据
        // message.success('加载数据')
      }
    },
    {
      wait: 1000,
      leading: true
    }
  )

  useEffect(() => {
    if (isHaveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }

    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, isHaveMoreData])

  // LoadMore Elem
  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading)
      return (
        <>
          <Spin></Spin>
          <div style={{ marginTop: '3px' }}>正在加载中</div>
        </>
      )
    if (total === 0) return <Empty description="暂无数据" />
    if (!isHaveMoreData) return <div>没有更多了...</div>
    return <div>开始加载下一页</div>
  }, [started, loading, isHaveMoreData])
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <h2>我的问卷</h2>
        </div>
        <div className={styles.right}>
          <SearchInfo />
        </div>
      </div>
      <div className={styles.content}>
        {/* <div style={{ height: '1200px' }}></div> */}

        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </div>
  )
})

export default List
