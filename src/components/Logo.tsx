import React, { memo, FC, useState, useEffect } from 'react'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'
import useGetUserInfo from '@/hooks/useGetUserInfo'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '@/router'

const Logo: FC = memo(() => {
  const { username } = useGetUserInfo()

  const [pathname, setPathName] = useState(HOME_PATHNAME)

  useEffect(() => {
    if (username) {
      setPathName(MANAGE_INDEX_PATHNAME)
    }
  }, [pathname])
  return (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <div className={styles.container}>
        <FormOutlined />
        <span>61问卷</span>
      </div>
    </Link>
  )
})

export default Logo
