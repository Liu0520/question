import React, { memo, FC, useState } from 'react'
import styles from './Common.module.scss'
import { Typography, Empty, Spin } from 'antd'
import QuestionCard from '@/components/QuestionCard'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'
import ListPage from '@/components/ListPage'

type DataType = {
  list: []
  total: number
}
const Star: FC = memo(() => {
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true })
  const { list = [], total = 0 } = data as DataType

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <h2>我的问卷</h2>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </div>
  )
})

export default Star
