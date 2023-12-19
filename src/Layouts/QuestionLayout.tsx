import useLoadUserData from '@/hooks/useLoadUserData'
import useNavPage from '@/hooks/useNavPage'
import { Spin } from 'antd'
import React, { memo, FC } from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = memo(() => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)
  return (
    <div style={{ height: '100vh' }}>
      {waitingUserData ? (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  )
})

export default QuestionLayout
