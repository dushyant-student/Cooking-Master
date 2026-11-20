
import Footer from '@/components/Footer'
import HomeNavBar from '@/components/HomeNavbar'
import React from 'react'

export default function layout({children}) {
  return (
    <div  >
        <HomeNavBar/>
       
        <div className='mt-15 px-4'>
            {children}
        </div>
        <Footer/>
    </div>
  )
}
