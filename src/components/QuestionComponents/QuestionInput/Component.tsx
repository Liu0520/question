import { Input } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import React, { memo, FC } from 'react'
import { QuestionInputDefaultProps, QuestionInputPropsType } from './interface'

const QuestionInput: FC<QuestionInputPropsType> = memo((props: QuestionInputPropsType) => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  )
})

export default QuestionInput
