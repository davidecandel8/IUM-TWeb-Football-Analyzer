import React from 'react'
import { useState} from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, Button, Image} from '@nextui-org/react'
import Ranking from './Ranking'
import { competition_img, capitalizeString } from '../../utils/commons'

function ModalClubCard({isModalOpen, closeModal, competition_info}) {
  
  const [isRankingOpen, setIsRankingOpen] = useState(false)

  if(!competition_info){
    return null;
  }
  
  const handleCloseModal = () => {
    setIsRankingOpen(false)
    closeModal()
  }

  return competition_info ? (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal} size={ isRankingOpen ? '3xl' : 'xl'} className='bg-grey3' classNames={{
        backdrop: "backdrop-blur-sm backdrop-opacity-4",
        closeButton: "hover:bg-myGreen/20 text-myGreen/100",
      }} scrollBehavior='inside' placement='center'>
    <ModalContent>
        {
          isRankingOpen ? (<Ranking rankingOpen={isRankingOpen} closeRanking={setIsRankingOpen} competition_id={competition_info.competition_id} />) : (
            <>
            <ModalHeader className="flex flex-col text-white text-3xl italic items-center p-2">{capitalizeString(competition_info.competition_name)}</ModalHeader>
            <ModalBody className='text-white flex flex-row p-2'>
                <div className='flex p-2'>
                    <Image src={competition_img(competition_info.competition_id)} width={200} isBlurred/>
                </div>
                <div className='flex flex-col items-left p-2 gap-0.5'>
                    {competition_info.country_name && (<p className='text-justify italic'><span className='font-semibold text-myGreen'>Country: </span> <span className= 'font-bold'>{capitalizeString(competition_info.country_name)}</span></p>)}
                    <p className='text-justify italic'><span className='font-semibold text-myGreen'>Type: </span> <span className= 'font-bold'>{capitalizeString(competition_info.type)}</span></p>
                    <p className='text-justify italic'><span className='font-semibold text-myGreen'>Sub Type: </span> <span className= 'font-bold'>{capitalizeString(competition_info.sub_type)}</span></p>
                    <p className='text-justify italic'><span className='font-semibold text-myGreen'>Confederation: </span> <span className= 'font-bold'>{capitalizeString(competition_info.confederation)}</span></p>
                    <br/>
                    {competition_info.sub_type === 'first_tier' && ( // Mostra il bottone solo se il sub-type è "First Tier"
                      <Button className='bg-myGreen' onPress={()=>setIsRankingOpen(true)} size='sm'>
                        Ranking
                      </Button>
                    )}
                </div>  
            </ModalBody>
            </>
          )
        }  
    </ModalContent>
  </Modal>
  ) : <> </>
}

export default ModalClubCard
