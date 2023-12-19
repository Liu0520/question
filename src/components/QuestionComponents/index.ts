import { FC } from 'react'
import QuestionCheckboxConf, {
  QuestionCheckboxPropsType,
  QuestionCheckboxStatPropsType
} from './QuestionCheckbox'
import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph'
import QuestionRadioConf, {
  QuestionRadioPropsType,
  QuestionRadioStatPropsType
} from './QuestionRadio'
import QuestionTextareaConf, { QuestionTextareaPropsType } from './QuestionTextarea'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'

// 各个组件的 proptype
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType &
  QuestionParagraphPropsType &
  QuestionTextareaPropsType &
  QuestionInfoPropsType

// 统一，各个组件的统计属性类型
type ComponentStatPropsType = QuestionRadioStatPropsType & QuestionCheckboxStatPropsType

// 统一， 组件的配置
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
  PropComponent: FC<ComponentPropsType>
  StatComponent?: FC<ComponentStatPropsType>
}

// 组件分组, 用于左侧面板展示
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf]
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextareaConf]
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    components: [QuestionRadioConf, QuestionCheckboxConf]
  }
]

// 组件配置列表
const componentConfList: ComponentConfType[] = [
  QuestionInfoConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInputConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf
]

export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type)
}
