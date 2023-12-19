import { ComponentsStateType, ComponentInfoType } from '.'

/**
 * 将新的组件插入到store中
 * @param state redux 数据
 * @param newComponent 新的组件
 */
export function insertNewcomponent(state: ComponentsStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = state
  const index = componentList.findIndex((c) => c.fe_id === selectedId)

  if (index < 0) {
    // 未选中任何组件
    componentList.push(newComponent)
  } else {
    // 插入到选择的元素后面
    state.componentList.splice(index + 1, 0, newComponent)
  }
  // 插入后为选中状态
  state.selectedId = newComponent.fe_id
}

/**
 * 获取下一个SelectedId
 * @param fe_id 当前选中SelectedId
 * @param componentList store中画布所展示的所有组件
 */
export function getNextSelected(fe_id: string, componentList: ComponentInfoType[]) {
  const index = componentList.filter((c) => !c.isHidden).findIndex((c) => c.fe_id === fe_id)

  // 没有找到
  if (index < 0) return ''

  // 重新计算Selected
  const len = componentList.length
  let newSelectedId = ''
  if (len <= 1) {
    newSelectedId = ''
  } else {
    if (index === len - 1) {
      newSelectedId = componentList[index - 1].fe_id
    } else {
      newSelectedId = componentList[index + 1].fe_id
    }
  }
  return newSelectedId
}
