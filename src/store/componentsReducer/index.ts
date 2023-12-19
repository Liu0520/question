import { ComponentPropsType } from '@/components/QuestionComponents'
import { arrayMove } from '@dnd-kit/sortable'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'
import { nanoid } from 'nanoid'
import { getNextSelected, insertNewcomponent } from './util'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType

  isHidden?: boolean
  isLocked?: boolean
}

export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
  copiedComponent: ComponentInfoType | null
}

const INITIAL_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INITIAL_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },

    // 设置selectedId  在画布上点击组件通过Id进行联动
    changeSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
      state.selectedId = action.payload
    },

    // 添加新组件
    addComponent: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload

      insertNewcomponent(state, newComponent)
    },

    //右侧面板更改组件属性
    changeComponentProps: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) => {
      const { fe_id, newProps } = action.payload

      // 找到当前修改的组件
      const curComp = state.componentList.find((c) => c.fe_id === fe_id)
      if (curComp) {
        curComp.props = { ...curComp.props, ...newProps }
      }
    },

    // 删除选中组件
    removeSelectedComponent: (state: ComponentsStateType) => {
      const { selectedId: removeId, componentList = [] } = state

      // 重新计算SelectedId
      const newSelectedId = getNextSelected(removeId, componentList)
      state.selectedId = newSelectedId

      const index = componentList.findIndex((c) => c.fe_id === removeId)
      componentList.splice(index, 1)
    },

    // 隐藏显示组件
    changeComponentHidden: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) => {
      const { componentList } = state
      const { fe_id, isHidden } = action.payload

      // 重新计算SelectedId
      let newSelectedId = ''
      if (isHidden) {
        newSelectedId = getNextSelected(fe_id, componentList)
      } else {
        newSelectedId = fe_id
      }
      state.selectedId = newSelectedId

      const curComp = componentList.find((c) => c.fe_id === fe_id)
      if (curComp) {
        curComp.isHidden = isHidden
      }
    },

    // 锁定/解锁组件
    toggleComponentLocked: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string }>
    ) => {
      const { fe_id } = action.payload

      const curComp = state.componentList.find((c) => c.fe_id === fe_id)
      if (curComp) {
        curComp.isLocked = !curComp.isLocked
      }
    },

    // 复制当前选中组件
    copySelectedComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList = [] } = state

      const selectedComponent = componentList.find((c) => c.fe_id === selectedId)
      if (!selectedComponent) return
      state.copiedComponent = cloneDeep(selectedComponent)
    },

    // 粘贴组件
    pasteCopiedComponent: (state: ComponentsStateType) => {
      const { copiedComponent, componentList } = state
      if (!copiedComponent) return

      // 修改复制后的fe_id
      copiedComponent.fe_id = nanoid()

      // 插入到画板中
      insertNewcomponent(state, copiedComponent)
    },

    // 选中上一个
    selectPrevComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state
      const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId)

      if (selectedIndex < 0) return //未选中组件

      const len = componentList.length
      if (selectedIndex === 0) {
        state.selectedId = componentList[len - 1].fe_id
      } else {
        state.selectedId = componentList[selectedIndex - 1].fe_id
      }
    },

    // 选中下一个
    selectNextComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state
      const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId)

      if (selectedIndex < 0) return //未选中组件

      const len = componentList.length
      if (selectedIndex === len - 1) {
        state.selectedId = componentList[0].fe_id
      } else {
        state.selectedId = componentList[selectedIndex + 1].fe_id
      }
    },

    // 修改组件标题
    changeComponentTitle: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; title: string }>
    ) => {
      const { fe_id, title } = action.payload

      const curComp = state.componentList.find((c) => c.fe_id === fe_id)
      if (curComp) curComp.title = title
    },

    // 移动组件位置
    moveComponent: (
      state: ComponentsStateType,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { componentList: curComponentList } = state
      const { oldIndex, newIndex } = action.payload

      state.componentList = arrayMove(curComponentList, oldIndex, newIndex)
    }
  }
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectNextComponent,
  selectPrevComponent,
  changeComponentTitle,
  moveComponent
} = componentsSlice.actions

export default componentsSlice.reducer
