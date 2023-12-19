import QuestionInput from '@/components/QuestionComponents/QuestionInput/Component'
import QuestionTitle from '@/components/QuestionComponents/QuestionTitle/Component'
import { Spin } from 'antd'
import React, { memo, FC } from 'react'
import styles from './EditCanvas.module.scss'
import useGetComponentsInfo from '../../../hooks/useGetComponentsInfo'
import { changeSelectedId, ComponentInfoType, moveComponent } from '@/store/componentsReducer'
import { getComponentConfByType } from '@/components/QuestionComponents'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import SortableContainer from '@/components/DragSortable/SortableContainer'
import SortableItem from '@/components/DragSortable/SortableItem'

type PropsType = {
  loading: boolean
}

/**
 *
 * @param componentInfo 通过返回数据找出对应组件
 * @returns 返回正确组件
 */
function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  // console.log(componentInfo)
  const componentConf = getComponentConfByType(type)
  if (!componentConf) return null
  const { Component } = componentConf
  // console.log(type, props)
  return <Component {...props} />
}

// eslint-disable-next-line react/prop-types
const EditCanvas: FC<PropsType> = memo(({ loading }) => {
  const { componentList, selectedId } = useGetComponentsInfo()
  const dispatch = useDispatch()

  function handleClick(e: any, id: string) {
    // 禁止冒泡
    e.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '40vh' }}>
        <Spin />
      </div>
    )
  }

  // SortableContainer 组件每个item 需要 id 属性
  const componentListWithId = componentList.map((c) => {
    return { ...c, id: c.fe_id }
  })

  // 拖拽排序结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter((c) => !c.isHidden)
          .map((c) => {
            const { fe_id, isLocked } = c
            // 判断是否选中组件
            const wrapperDefaultClassName = styles['component-wrapper']
            const selectedClassName = styles.selected
            const lockedClassName = styles.locked
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: fe_id === selectedId,
              [lockedClassName]: isLocked
            })

            return (
              <SortableItem id={fe_id} key={fe_id}>
                <div className={wrapperClassName} onClick={(e) => handleClick(e, fe_id)}>
                  <div className={styles.component}>{genComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
})

export default EditCanvas
