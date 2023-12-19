import { ConfigProvider } from 'antd'
import React, { memo, FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './router'
import zhCN from 'antd/lib/locale/zh_CN'
import { Provider } from 'react-redux'
import store from './store'
const App: FC = memo(() => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <RouterProvider router={router}></RouterProvider>
      </ConfigProvider>
    </Provider>
  )
})

export default App
