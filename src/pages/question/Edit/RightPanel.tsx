import useGetComponentsInfo from '@/hooks/useGetComponentsInfo'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import React, { memo, FC, useState, useEffect } from 'react'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'

enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting'
}
// tabBar
const tabItems = [
  {
    key: TAB_KEYS.PROP_KEY,
    label: (
      <span>
        <FileTextOutlined />
        属性
      </span>
    ),
    children: <ComponentProp />
  },
  {
    key: TAB_KEYS.SETTING_KEY,
    label: (
      <span>
        <SettingOutlined />
        页面设置
      </span>
    ),
    children: <PageSetting />
  }
]

const RightPanel: FC = memo(() => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY)
  const { selectedId } = useGetComponentsInfo()

  useEffect(() => {
    if (selectedId) setActiveKey(TAB_KEYS.PROP_KEY)
    else setActiveKey(TAB_KEYS.SETTING_KEY)
  }, [selectedId])

  function handleClick(key: string) {
    if (key === TAB_KEYS.PROP_KEY) setActiveKey(TAB_KEYS.PROP_KEY)
    else setActiveKey(TAB_KEYS.SETTING_KEY)
  }
  return (
    <Tabs
      items={tabItems}
      activeKey={activeKey}
      onTabClick={(activeKey) => handleClick(activeKey)}
    />
  )
})

export default RightPanel
