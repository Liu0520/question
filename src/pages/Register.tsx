import styles from './Register.module.scss'

import { UserAddOutlined } from '@ant-design/icons'
import Title from 'antd/es/typography/Title'
import { Button, Space, Checkbox, Form, Input, message } from 'antd'
import React, { memo, FC, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '@/router'
import { PASSWORD_KEY } from '@/constants'
import { useRequest } from 'ahooks'
import { registerService } from './services/user'

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

const Register: FC = memo(() => {
  const nav = useNavigate()
  const { run } = useRequest(
    async (values) => {
      const { username, nickname, password } = values
      await registerService(username, nickname, password)
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success('注册成功！')
        nav(LOGIN_PATHNAME)
      }
    }
  )

  const onFinish = (values: any) => {
    run(values)
  }
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名！' },
              {
                type: 'string',
                min: 6,
                max: 20,
                message: '用户名长度为6-20'
              },
              {
                pattern: /^\w+$/,
                message: '只能是数字或下划线'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="昵称"
            name="nickname"
            rules={[{ required: true, message: '请输入昵称!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: '请再次输入密码!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次输入不一致'))
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有账号，登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
})

export default Register
