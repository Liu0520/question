import useGetUserInfo from '@/hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
import { getUserInfoService } from '@/pages/services/user'
import { LOGIN_PATHNAME } from '@/router'
import { removeToken } from '@/utils/user-token'
import { UserOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, message, Space } from 'antd'
import React, { memo, FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logoutReducer } from '@/store/useReducer'

const UserInfo: FC = memo(() => {
  const nav = useNavigate()
  const dispatch = useDispatch()

  // const { data } = useRequest(getUserInfoService)
  // const { username, nickname } = data || {}
  const { username, nickname } = useGetUserInfo()

  // 退出
  function logout() {
    dispatch(logoutReducer()) //清空redux中数据
    removeToken()
    message.success('退出成功！')
    nav(LOGIN_PATHNAME)
  }

  const UserInfo = (
    <Space>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </Space>
  )

  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>
  return <div>{username ? UserInfo : Login}</div>
})

export default UserInfo
