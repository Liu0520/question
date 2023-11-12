import React, { memo, FC } from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout: FC = memo(() => {
  return (
    <>
      <div>MainLayout Header</div>
      <Outlet></Outlet>
      <div>MainLayout Footer</div>
    </>
  )
})

export default MainLayout
