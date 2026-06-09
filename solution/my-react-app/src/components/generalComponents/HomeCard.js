import React from 'react'
import { Card, CardBody, CardFooter, CardHeader, Image, Button } from '@nextui-org/react'
import { useNavigate } from 'react-router'


function HomeCard({title, description, img, link}) {

  const navigate = useNavigate()
  
  return (
    <Card className="w-auto h-auto flex bg-grey3">
      <CardHeader className='flex justify-center text-white text-2xl font-semibold'>
          <p>{title}</p>
      </CardHeader>
      <CardBody className='flex flex-col'>
        <div className='flex flex-row justify-center'>
          <Image src={img.src} alt={img.alt} className='bg-cover w-[300px] h-[350px] mb-3' isZoomed/>
        </div>
        <div className='flex flex-row justify-center items-center mt-3'>
          <p className='text-center text-white font-light'>{description}</p>
        </div>
      </CardBody>
      
      <CardFooter className='flex justify-center '>
          <Button radius='full' className='font-medium bg-myGreen w-[150px]' onClick={()=>{navigate(link.route)}}>
            <p className='text-black'>{link.text}</p>
          </Button>
      </CardFooter>
    </Card>
  )
}

export default HomeCard
