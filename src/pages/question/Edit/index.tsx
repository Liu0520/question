import useLoadQuestionData from '@/hooks/useLoadQuestionData'
import { changeSelectedId } from '@/store/componentsReducer'
import React, { memo, FC } from 'react'
import { useDispatch } from 'react-redux'
import EditCanvas from './EditCanvas'
import EditHeader from './EditHeader'
import styles from './index.module.scss'
import LeftPannel from './LeftPanel'
import RightPanel from './RightPanel'

const Edit: FC = memo(() => {
  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()

  // 点击空白取消组件选择状态
  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={styles.container}>
      <div>
        <EditHeader />
      </div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPannel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <div>
                <EditCanvas loading={loading} />
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
})

export default Edit
