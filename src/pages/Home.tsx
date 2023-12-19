import React, { memo, FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '@/router'
import styles from './Home.module.scss'

const Home: FC = memo(() => {
  const nav = useNavigate()

  return (
    <div className={styles.container}>
      <h1>问卷调查 | 在线投票</h1>
      <div className={styles.dec}>已累计创建问卷 100 份，发布问卷 90 份, 收到答卷 980 份</div>
      <div>
        <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)} className={styles.use}>
          开始使用
        </Button>
      </div>
    </div>
  )
})

export default Home
