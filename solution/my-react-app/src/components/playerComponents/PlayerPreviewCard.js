import React from 'react'
import { Card, CardBody, Image} from '@nextui-org/react'
import {Link} from 'react-router-dom'

function PlayerPreviewCard({player_index, openModal, setPlayer,...player}) {
  
  return (
    <Card className='bg-grey3' isPressable onPress={openModal}>
        <CardBody>
            <div className='flex flex-row'>
                <div className='w-1/3 place-content-center' >
                  <Image src={player.img_url} isBlurred width={100}/>
                </div>
                <div className=' w-2/3 place-content-center flex flex-col text-white gap-2'>
                    <p className='text-lg italic whitespace-nowrap'><span className='text-myGreen'>Name: </span>{player.name} </p>
                    <p className='text-lg italic whitespace-nowrap'><span className='text-myGreen'>Club: </span><Link className='text-white' showAnchorIcon to={`/clubs/${player.club}`}>{player.club}</Link></p>
                    <p className='text-lg italic whitespace-nowrap'><span className='text-myGreen'>Position:</span> {player.position}</p>
                </div>  
            </div>       
        </CardBody>
    </Card>
  )
}

export default PlayerPreviewCard
