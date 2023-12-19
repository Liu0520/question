import { StateType } from '@/store'
import { ComponentsStateType } from '@/store/componentsReducer'
import { shallowEqual, useSelector } from 'react-redux'

function useGetComponentsInfo() {
  const components = useSelector<StateType>(
    (state) => state.components.present,
    shallowEqual
  ) as ComponentsStateType

  const { componentList = [], selectedId, copiedComponent } = components

  const selectedComponent = componentList.find((c) => c.fe_id === selectedId)

  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent
  }
}

export default useGetComponentsInfo
