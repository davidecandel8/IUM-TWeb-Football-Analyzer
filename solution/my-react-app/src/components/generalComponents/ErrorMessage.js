import React from 'react'
import Lottie from 'react-lottie'
import animationError from '../../assets/animations/errorAnimation.json'

function ErrorMessage({msg}) {
  return (
    <div className='flex flex-col w-full h-screen items-center justify-center'>
      <Lottie options={{
          loop: true,
          autoplay: true,
          animationData: animationError,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid"
          }}
        } height={150} />
        <p className='text-white text-2xl mt-2'>{msg}</p>
    </div>
  )
}

export default ErrorMessage
