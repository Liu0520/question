import React, { memo, FC, useEffect } from 'react'
import styles from './Login.module.scss'
import Title from 'antd/es/typography/Title'
import { Button, Space, Checkbox, Form, Input, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '@/router'
import { Link, useNavigate } from 'react-router-dom'
import { PASSWORD_KEY, USERNAME_KEY } from '@/constants'
import { loginService } from './services/user'
import { useRequest } from 'ahooks'
import { setToken } from '@/utils/user-token'

function rememberUserInfo(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

function deleteUserInfo() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

function getUserInfo() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY)
  }
}

const Login: FC = memo(() => {
  const nav = useNavigate()

  const { run } = useRequest(
    async (username: string, password: string) => await loginService(username, password),
    {
      manual: true,
      debounceWait: 500,
      onSuccess(res) {
        // 存储token
        setToken(res.token)
        message.success('登录成功！')
        nav(MANAGE_INDEX_PATHNAME)
      }
    }
  )

  // 使用form实现加载赋初值
  const [form] = Form.useForm()
  useEffect(() => {
    const { username, password } = getUserInfo()
    form.setFieldsValue({ username, password })
  })

  const onFinish = (values: any) => {
    const { username, password, remember } = values
    run(username, password)
    if (remember) {
      rememberUserInfo(username, password)
    } else {
      deleteUserInfo()
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入用户密码！' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
})

export default Login
