import React, { memo, FC, useState } from 'react'
import styles from './Common.module.scss'
import { Empty, Table, Tag, Button, Space, Modal, message, Spin } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'
import ListPage from '@/components/ListPage'
import { deleteQuestionsService, updateQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

const { confirm } = Modal
type DataType = {
  list: []
  total: number
}
const Trash: FC = memo(() => {
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data as DataType

  const [selectIds, setSelectIds] = useState<string[]>([])

  // 恢复
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        setSelectIds([])
        message.success('恢复成功！')
        refresh() //手动刷新列表
      }
    }
  )

  // 删除
  const { run: deleteQuestions } = useRequest(async () => await deleteQuestionsService(selectIds), {
    manual: true,
    onSuccess() {
      setSelectIds([])
      message.success('删除成功！')
      refresh()
    }
  })
  function del() {
    confirm({
      title: '确定彻底删除？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后不可找回',
      onOk() {
        deleteQuestions()
      },
      cancelText: '取消',
      okText: '确定'
    })
  }

  // 表格
  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title'
      // key: 'title', //循环列的 key, 它默认取 dataIndex 的值
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      }
    },
    {
      title: '答卷',
      dataIndex: 'answerCount'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt'
    }
  ]

  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectIds.length === 0} onClick={recover}>
            恢复
          </Button>
          <Button danger disabled={selectIds.length === 0} onClick={del}>
            删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={(q: any) => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys) => {
            setSelectIds(selectedRowKeys as string[])
          }
        }}
      />
    </>
  )
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <h2>我的问卷</h2>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        <ListPage total={total} />
      </div>
    </div>
  )
})

export default Trash
