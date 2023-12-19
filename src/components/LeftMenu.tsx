import React, { memo, FC } from 'react'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Divider, Space, message } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { createQuestionService } from '@/pages/services/question'

const LeftMenu: FC = memo(() => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  const { loading, run: handleCreateClick } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(res) {
      nav(`/question/edit/${res.id}`)
      message.success('创建成功')
    }
  })
  return (
    <div style={{ width: '120px' }}>
      <Space direction="vertical">
        <Button
          type="primary"
          // size="large"
          icon={<PlusOutlined />}
          onClick={handleCreateClick}
          disabled={loading}
        >
          新建问卷
        </Button>
        <Divider style={{ borderTop: 'transparent' }} />
        <Button
          type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
          size="large"
          icon={<BarsOutlined />}
          onClick={() => nav('/manage/list')}
        >
          我的问卷
        </Button>
        <Button
          type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
          size="large"
          icon={<StarOutlined />}
          onClick={() => nav('/manage/star')}
        >
          星标问卷
        </Button>
        <Button
          type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
          size="large"
          icon={<DeleteOutlined />}
          onClick={() => nav('/manage/trash')}
        >
          回收站
        </Button>
      </Space>
    </div>
  )
})

export default LeftMenu
