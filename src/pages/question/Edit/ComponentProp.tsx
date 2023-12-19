import useGetComponentsInfo from '@/hooks/useGetComponentsInfo'
import { changeComponentProps } from '@/store/componentsReducer'
import React, { memo, FC } from 'react'
import { useDispatch } from 'react-redux'
import {
  ComponentPropsType,
  getComponentConfByType
} from '../../../components/QuestionComponents/index'

const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中数据</div>
}

const ComponentProp: FC = memo(() => {
  const dispatch = useDispatch()
  const { selectedComponent } = useGetComponentsInfo()
  if (!selectedComponent) return <NoProp />

  const { type, props, isLocked, isHidden } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (!componentConf) return <NoProp />

  function changeProps(newProps: ComponentPropsType) {
    if (!selectedComponent) return
    const { fe_id } = selectedComponent
    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  const { PropComponent } = componentConf

  return <PropComponent {...props} onChange={changeProps} disabled={isLocked || isHidden} />
})

export default ComponentProp
