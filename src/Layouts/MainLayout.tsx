import React, { memo, FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import styles from './MainLayout.module.scss'
import Logo from '@/components/Logo'
import UserInfo from '@/components/UserInfo'
import useLoadUserData from '@/hooks/useLoadUserData'
import useNavPage from '@/hooks/useNavPage'

const { Content } = Layout

const MainLayout: FC = memo(() => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)
  return (
    <div>
      <div className={styles.header}>
        <Logo />
        <UserInfo />
      </div>
      <Content className={styles.main}>
        {waitingUserData ? (
          <div style={{ textAlign: 'center', marginTop: '40vh' }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </Content>
      <div className={styles.footer}>61问卷 &copy; 2022 - 2023 Produced by Lydia</div>
    </div>
  )
})

export default MainLayout
