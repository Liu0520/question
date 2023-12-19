import styles from './ManageLayout.module.scss'

import React, { memo, FC, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import LeftMenu from '@/components/LeftMenu'

const ManageLayout: FC = memo(() => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname === '/manage') {
      nav('/manage/list')
    }
  }, [pathname])

  return (
    <div className={styles.container}>
      <LeftMenu />
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
})

export default ManageLayout
