import styles from './QuestionCard.module.scss'
import React, { memo, FC, useState } from 'react'
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { duplicateQuestionService, updateQuestionService } from '@/pages/services/question'

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

const { confirm } = Modal
const QuestionCard: FC<PropsType> = memo((props: PropsType) => {
  const nav = useNavigate()
  const { _id, title, isPublished, answerCount, createdAt, isStar } = props

  // 修改标星
  const [isStarState, setIsStarState] = useState(isStar)

  const { run: changeStar, loading: changeStarLoading } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        // 更新标星状态
        setIsStarState(!isStarState)
        message.success('标星成功！')
      }
    }
  )

  // 复制
  const { loading: duplicatedLoading, run: duplicate } = useRequest(
    async () => await duplicateQuestionService(_id),
    {
      manual: true,
      onSuccess(res) {
        message.success('复制成功！')
        nav(`/question/edit/${res.id}`)
      }
    }
  )

  // 删除
  const [isDeleted, setIsDeleted] = useState(false)
  const { loading: deleteLoading, run } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true
    }
  )
  function deleteQuestion() {
    confirm({
      title: '确定删除该问卷吗？',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        run()
        setIsDeleted(true)
        message.success('删除成功')
      },
      cancelText: '取消',
      okText: '确定'
    })
  }

  // 已经删除的问卷，不再渲染
  if (isDeleted) return null
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <Tag>答卷：{answerCount}</Tag>
            <Tag>{createdAt}</Tag>
          </Space>
        </div>
      </div>
      <Divider />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              icon={<StarOutlined style={{ color: isStarState ? 'red' : '' }} />}
              type="text"
              size="small"
              onClick={changeStar}
              disabled={changeStarLoading}
            >
              {isStarState ? '取消' : '标星'}
            </Button>
            <Popconfirm
              title="确实复制该问卷？"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button icon={<CopyOutlined />} type="text" size="small" disabled={duplicatedLoading}>
                复制
              </Button>
            </Popconfirm>
            <Modal
              title="确定删除该问卷吗？"
              closeIcon={<ExclamationCircleOutlined />}
              onOk={() => alert('删除')}
            ></Modal>
            <Button
              icon={<DeleteOutlined />}
              type="text"
              size="small"
              onClick={deleteQuestion}
              disabled={deleteLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
})

export default QuestionCard
