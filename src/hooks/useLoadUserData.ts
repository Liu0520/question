import { getUserInfoService } from '@/pages/services/user'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import useGetUserInfo from './useGetUserInfo'
import { useDispatch } from 'react-redux'
import { loginReducer } from '@/store/useReducer'

function useLoadUserData() {
  const dispatch = useDispatch()
  const [waitingUserData, setWaitingUserData] = useState(true)

  // ajax加载用户信息
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(res) {
      const { username, nickname } = res
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitingUserData(false)
    }
  })

  //  判断redux store中是否存在用户信息
  const { username } = useGetUserInfo()
  useEffect(() => {
    if (username) {
      setWaitingUserData(false) //已经存在用户信息，就不用加载
      return
    }
    run()
  }, [username])

  // 请求加载完用户信息之后，放在Redux中，不用返回
  return { waitingUserData }
}

export default useLoadUserData
