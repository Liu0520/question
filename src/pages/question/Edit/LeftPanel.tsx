import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import React, { memo, FC } from 'react'
import ComponentLib from './ComponentLib'
import Layer from './Layer'

// tabBar
const tabItems = [
  {
    key: 'componentLib',
    label: (
      <span>
        <AppstoreOutlined />
        组件库
      </span>
    ),
    children: <ComponentLib />
  },
  {
    key: 'layers',
    label: (
      <span>
        <BarsOutlined />
        图层
      </span>
    ),
    children: <Layer />
  }
]

const LeftPannel: FC = memo(() => {
  return <Tabs defaultActiveKey="componentLib" items={tabItems} />
})

export default LeftPannel
