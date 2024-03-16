import React from 'react'
import Navbar from '../navbar/Navbar'

import Routers from '../../routers/Routers'



const Layout = () => {
  return (
    <>
    <Navbar />
    <div>
        <Routers />
    </div>

  </>
  )
}

export default Layout