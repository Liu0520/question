import { PAGESIZE_PARAM_KEY, PAGE_PARAM_KEY, PAGE_SIZE, SEARCH_PARAM_KEY } from '@/constants'
import { getQuestionListService } from '@/pages/services/question'
import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}
function useLoadQuestionListData(op: Partial<OptionType> = {}) {
  const { isDeleted, isStar } = op
  const [searchParams] = useSearchParams()
  const { data, loading, error, refresh } = useRequest(
    async function () {
      const keyword = searchParams.get(SEARCH_PARAM_KEY) || ''
      const page = parseInt(searchParams.get(PAGE_PARAM_KEY) || '') || 1
      const pageSize = parseInt(searchParams.get(PAGESIZE_PARAM_KEY) || '') || PAGE_SIZE
      const data = await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize })
      return data
    },
    {
      refreshDeps: [searchParams] //刷新依赖项
    }
  )

  return { data, loading, error, refresh }
}

export default useLoadQuestionListData
