import React, { memo, FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import List from './pages/manage/List'
import router from './router'

const App: FC = memo(() => {
  return <RouterProvider router={router}></RouterProvider>
})

export default App
