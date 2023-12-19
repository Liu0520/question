import { componentConfGroup, ComponentConfType } from '@/components/QuestionComponents'
import { addComponent } from '@/store/componentsReducer'
import { nanoid } from 'nanoid'
import React, { memo, FC } from 'react'
import { useDispatch } from 'react-redux'
import styles from './ComponentLib.module.scss'

function genComponent(c: ComponentConfType) {
  const dispatch = useDispatch()
  const { title, type, Component, defaultProps } = c

  function handleClick() {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps
      })
    )
  }

  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const ComponentLib: FC = memo(() => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group
        return (
          <div key={groupId}>
            <h3 style={{ marginTop: index > 0 ? '12px' : '0px', marginBottom: '5px' }}>
              {groupName}
            </h3>
            <div>{components.map((c) => genComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
})

export default ComponentLib
