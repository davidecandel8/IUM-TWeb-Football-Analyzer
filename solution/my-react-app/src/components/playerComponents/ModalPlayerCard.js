import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, Image} from '@nextui-org/react'
import {Link} from 'react-router-dom'
import { formatClubName } from '../../utils/commons'
import { formatMillions } from '../../utils/commons'

function ModalPlayerCard({isModalOpen, closeModal, player_info}) {

  console.log(JSON.stringify(player_info))

  if(!player_info){
    console.log('player_info is null')
    return null
  }

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} size='2xl' className='bg-grey3' classNames={{backdrop: "backdrop-blur-sm backdrop-opacity-4", closeButton: "hover:bg-myGreen/20 text-myGreen/100"}} placement='center'>
    <ModalContent>
        <ModalHeader className="flex flex-col text-white text-3xl italic items-center p-2">{player_info.name}</ModalHeader>
        <ModalBody className='text-white flex flex-row p-2'>
          <div className='flex p-2'>
            <Image src={player_info.img_url} width={200} isBlurred/>
          </div>
          <div className='flex flex-col items-left p-2 gap-0.5'>
            <p className='text-justify italic'><span className='font-semibold text-myGreen'>Age: </span><span className='font-bold'>{player_info.age}</span></p>
            <p className='text-justify italic'><span className='font-semibold text-myGreen'>Height: </span> {player_info.height===-1 ? <span className='font-bold'> Data unavailable </span> : <span className='font-bold'>{player_info.height} cm</span>}</p>
            <p className='text-justify italic'><span className='font-semibold text-myGreen'>Citizenship: </span> <span className='font-bold'>{player_info.citizenship}</span></p>
            <p className='text-justify italic'><span className='font-semibold text-myGreen'>Club: </span>  <Link showAnchorIcon to={`/clubs/${formatClubName(player_info.club)}`} className=' text-white font-bold'>{formatClubName(player_info.club)}</Link></p>
            <p className='text-justify italic'><span className='font-semibold text-myGreen'>Position: </span> <span className='font-bold'>{player_info.sub_position}</span></p>
            <p className='text-justify italic'><span className='font-semibold text-myGreen'>Goals: </span>  <span className='font-bold'>{player_info.goals}</span></p>
            <p className='text-justify italic'><span className='font-semibold text-myGreen'>Assists: </span> <span className='font-bold'>{player_info.assists}</span></p>
            <p className='text-justify italic'><span className='font-semibold text-myGreen'>Foot: </span> <span className='font-bold'>{player_info.foot ? player_info.foot : 'Data Unavailable'}</span></p>
            <p className='text-justify italic'><span className='font-semibold text-myGreen'>Playing status: </span> {player_info.last_season===2023 ? (<span className='font-bold'>Still playing</span>) : (<span className='font-bold'>Retired in {player_info.last_season}/{player_info.last_season+1} </span>)}</p>
            <p className='text-justify italic'><span className='font-semibold text-myGreen'>Highest market value: </span> <span className='font-bold'>{player_info.highest_market_value !== -1 ? `${formatMillions(player_info.highest_market_value)} in ${player_info.value_date}` : 'Data unavailable'}</span></p>          
          </div>  
        </ModalBody>
    </ModalContent>
  </Modal>
  )
}

export default ModalPlayerCard
