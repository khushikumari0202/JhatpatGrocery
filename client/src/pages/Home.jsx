import React from 'react'
import Mainbanner from '../components/Mainbanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import { BottomBanner } from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <div className='mt-10'>
        <Mainbanner />
        <Categories />
        <BestSeller />
        <BottomBanner />
        <NewsLetter />
    </div>
  )
}

export default Home