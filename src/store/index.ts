import { configureStore } from '@reduxjs/toolkit'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'
import userReducer, { UserDataType } from './useReducer'

export type StateType = {
  user: UserDataType
  components: StateWithHistory<ComponentsStateType> //增加undo类型
  pageInfo: PageInfoType
}

const store = configureStore({
  reducer: {
    // 分模块
    user: userReducer,
    // 组件列表 （需要撤销重做）
    components: undoable(componentsReducer, {
      limit: 20, //最大撤销步数
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectId',
        'components/selectPrevComponent',
        'components/selectNextComponent'
      ])
    }),
    // 问卷信息
    pageInfo: pageInfoReducer
  }
})

export default store
