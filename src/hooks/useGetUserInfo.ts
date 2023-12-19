import { UserDataType } from '@/store/useReducer'
import { useSelector } from 'react-redux'

type StateType = {
  user: UserDataType
}

function useGetUserInfo() {
  const { nickname, username } = useSelector<StateType>((state) => state.user) as UserDataType
  return { username, nickname }
}

export default useGetUserInfo
