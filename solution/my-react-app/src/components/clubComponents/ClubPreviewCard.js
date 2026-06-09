import React from 'react'
import { Card, CardBody, Image} from '@nextui-org/react'
import {Link} from 'react-router-dom'
import { capitalizeCompetitionName, club_img, formatClubName } from '../../utils/commons'

function ClubPreviewCard({ club_index, openModal, setClub, ...club }) {


  return club ? (
    <Card className='bg-grey3' isPressable onPress={openModal}>
      <CardBody>
      <div className="flex flex-row">
        
          <div className='w-1/3 place-content-center'>
            <Image src={club_img(club.club_id)} isBlurred width={100}/>
          </div>
          <div className=' w-2/3 place-content-center flex flex-col text-white gap-2'>
            <p className='text-lg italic whitespace-nowrap'><span className='text-myGreen'>Name: </span> {formatClubName(club.name)} </p>
            <p className='text-lg italic whitespace-nowrap'><span className='text-myGreen'>Competition: </span>
              <Link showAnchorIcon to={`/competitions/${club.domestic_competition_name}`} className= 'text-white'>{capitalizeCompetitionName(club.domestic_competition_name)}</Link>
            </p>
            <p className='text-lg italic whitespace-nowrap'><span className='text-myGreen'>Stadium: </span> {club.stadium_name} </p>
          </div>  
        </div>
      </CardBody>
    </Card>
  ) : <> </>
}

export default ClubPreviewCard
