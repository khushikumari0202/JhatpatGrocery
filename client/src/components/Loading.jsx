import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { useLocation } from 'react-router-dom';

const Loading = () => {
    const {navigate} = useAppContext();
    let {search} = useLocation();
    const query = new URLSearchParams(search);
    const nextUrl = query.get('next');

    useEffect(()=>{
        if(nextUrl){
            setTimeout(()=>{
                navigate(nextUrl) // Navigate to the next URL after 5 seconds
            }, 5000)
        }
    }, [nextUrl, navigate])

  return (
    <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-16 w-16 border-4 border-gray-500 border-t-primary'></div>
    </div>
  )
}

export default Loading