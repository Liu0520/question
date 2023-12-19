import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent
} from '@/store/componentsReducer'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'

// 只有鼠标在中间画布上的组件，才能使用快捷键操作
function isActiveElementValid() {
  // 获取页面聚焦元素，只有像表单输入框之类的不是document.body
  const activeElem = document.activeElement

  // // 没有增加 dnd-kit 之前
  // if (activeElem === document.body) return true // 光标没有 focus 到 input

  // 增加了 dnd-kit 以后
  if (activeElem === document.body) return true
  if (activeElem?.matches('div[role="button"]')) return true
  return false
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch()
  // 删除组件
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })

  // 复制组件
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })

  // 粘贴组件
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopiedComponent())
  })

  // 方向键上下选中
  useKeyPress('uparrow', (e) => {
    e.preventDefault()
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })
  useKeyPress('downarrow', (e) => {
    e.preventDefault()
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })
  // todo 撤销
  // 撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(UndoActionCreators.undo())
    },
    {
      exactMatch: true // 严格匹配
    }
  )

  // 重做
  useKeyPress(['ctrl.shift.z', 'meta.shift.z'], () => {
    if (!isActiveElementValid()) return
    dispatch(UndoActionCreators.redo())
  })
}

export default useBindCanvasKeyPress
