import { LoaderCircleIcon, LoaderIcon, LoaderPinwheelIcon } from 'lucide-react'
import React from 'react'
import { useThemeStore } from '../store/useThemeStore'

const PageLoader = () => {
  const {theme} = useThemeStore();
  return (
    <div className='min-h-screen flex items-center justify-center' data-theme={theme}>
        <LoaderCircleIcon className='animate-spin size-10 text-primary'/>
        <h1 className='text-primary'>Loading....</h1>
    </div>
  )
}

export default PageLoader