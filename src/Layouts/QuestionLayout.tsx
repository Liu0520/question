import React, { memo, FC } from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = memo(() => {
  return (
    <div>
      <div>QuestionLayout</div>
      <Outlet />
    </div>
  )
})

export default QuestionLayout
