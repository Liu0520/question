import Title from 'antd/es/typography/Title'
import React, { memo, FC } from 'react'
import { QuestionTitleDefaultProps, QuestionTitlePropsType } from './interface'

function gentFontSize(level: number) {
  switch (level) {
    case 1:
      return '24px'
    case 2:
      return '20px'
    case 3:
      return '16px'
    default:
      return '16px'
  }
}

const QuestionTitle: FC<QuestionTitlePropsType> = memo((props: QuestionTitlePropsType) => {
  // 有值传入就用props，没有就用默认值
  const { text = '', level = 1, isCenter = false } = { ...QuestionTitleDefaultProps, ...props }
  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? 'center' : 'start',
        fontSize: gentFontSize(level),
        margin: '10px'
      }}
    >
      {text}
    </Title>
  )
})

export default QuestionTitle
