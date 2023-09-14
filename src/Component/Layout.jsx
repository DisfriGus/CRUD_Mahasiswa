import React from 'react'

const Layout = ({children, style}) => {
  return (
    <div className={`mx-4 xl:mx-[160px] max-xl:pt-20 pt-4 ${style} overflow-hidden font-poppins`}>
        {children}
    </div>
  )
}

export default Layout