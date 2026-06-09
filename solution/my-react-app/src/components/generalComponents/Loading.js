import React from 'react'
import { CircularProgress } from '@nextui-org/react'

function Loading() {
  return (
    <div className='flex flex-col h-screen items-center justify-center'>
        <div>
            <CircularProgress classNames={
                {
                    svg: 'w-20 h-20',
                    indicator: "stroke-myGreen",
                    track: "stroke-white/5",
                }
            } color="#1bd954" className="text-white" size='xl' aria-label="Loading..."/>
        </div>    
        <p className='text-white text-2xl mt-2'>Loading...</p>
    </div>
  )
}

export default Loading
