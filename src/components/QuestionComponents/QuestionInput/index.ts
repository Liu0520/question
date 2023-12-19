/**
 * @description 问卷 输入框
 * @author Lydia
 */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionInputDefaultProps } from './interface'

export * from './interface'

export default {
  title: '输入框',
  type: 'questionInput',
  Component, //画布显示
  PropComponent, // 修改属性
  defaultProps: QuestionInputDefaultProps
}
