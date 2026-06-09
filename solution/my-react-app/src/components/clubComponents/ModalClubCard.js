import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, Image} from '@nextui-org/react'
import {Link} from 'react-router-dom'
import { formatClubName } from '../../utils/commons'
import { capitalizeCompetitionName } from '../../utils/commons'
import { club_img } from '../../utils/commons'

function ModalClubCard({isModalOpen, closeModal, club_info}) {

  if(!club_info){
    return null;
  }
 
  return club_info ? 
  (
    <Modal isOpen={isModalOpen} onClose={closeModal} size='2xl' className='bg-grey3' classNames={{
        backdrop: "backdrop-blur-sm backdrop-opacity-4",
        closeButton: "hover:bg-myGreen/20 text-myGreen/100",
      }} placement='center'>
    <ModalContent>
        <ModalHeader className="flex flex-col text-white text-3xl italic items-center p-2">{formatClubName(club_info.name)}</ModalHeader>
        <ModalBody className='text-white flex flex-row p-2'>
          <div className='flex p-2'>
            <Image src={club_img(club_info.club_id)} width={200} isBlurred/>
          </div>
          <div className='flex flex-col items-left p-2 gap-0.5'>  
            {club_info.name === formatClubName(club_info.name) ? null : <p className='text-justify italic'>State: <span className='font-bold'>Retired</span></p>}
            
            <p className='text-justify italic'><span className='font-semibold text-myGreen'>Competition: </span> <Link showAnchorIcon to={`/competitions/${club_info.domestic_competition_name}`} className= 'text-white font-bold'>{capitalizeCompetitionName(club_info.domestic_competition_name)}</Link> <span className='font-bold'>{"(last season " + club_info.last_season + "/" + (club_info.last_season+1) + ")"} </span></p>
            <p className='text-justify italic'><span className='font-semibold text-myGreen'>Squad Size: </span> <span className='font-bold'>{club_info.squad_size}</span></p>
            <p className='text-justify italic'><span className='font-semibold text-myGreen'>Average Age: </span> <span className='font-bold'>{club_info.average_age}</span></p>
            <p className='text-justify italic'><span className='font-semibold text-myGreen'>Foreigners Number: </span> <span className='font-bold'>{club_info.foreigners_number}</span></p>
            <p className='text-justify italic'><span className='font-semibold text-myGreen'>Foreigners Percentage: </span> <span className='font-bold'>{club_info.foreigners_percentage}</span></p>
            <p className='text-justify italic'><span className='font-semibold text-myGreen'>National Team Players: </span> <span className='font-bold'>{club_info.national_team_players}</span></p>
            <p className='text-justify italic'><span className='font-semibold text-myGreen'>Stadium: </span> <span className='font-bold'>{club_info.stadium_name}</span></p>
            <p className='text-justify italic'><span className='font-semibold text-myGreen'>Stadium Seats: </span> <span className='font-bold'>{club_info.stadium_seats}</span></p>
            <p className='text-justify italic'><span className='font-semibold text-myGreen'>Net Transfert Record: </span> <span className='font-bold'>{club_info.net_transfer_record}</span></p>
          </div>  
        </ModalBody>
    </ModalContent>
  </Modal>
  ) : <> </>
}

export default ModalClubCard
