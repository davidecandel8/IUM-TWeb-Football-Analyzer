import React from "react";
import { Card, CardBody, Image} from '@nextui-org/react'
import { competition_img, capitalizeString } from "../../utils/commons";


function CompetitionPreviewCard({ competition_index, openModal, setCompetition, ...competition }) {
  return competition ? (
    <Card className='bg-grey3' isPressable onPress={openModal}>
      <CardBody>
          <div className="flex flex-row">
            <div className='w-1/3 place-content-center'>
            <Image src={competition_img(competition.competition_id)} isBlurred width={100} />
            </div>
            <div className=' w-2/3 place-content-center flex flex-col text-white gap-2'>
              <p className='text-lg italic whitespace-nowrap'><span className='text-myGreen'>Name: </span> {capitalizeString(competition.competition_name)} </p>
              <p className='text-lg italic whitespace-nowrap'><span className='text-myGreen'>Type: </span> {capitalizeString(competition.type)} </p>
              { competition.country_name && ( <p className='text-lg italic whitespace-nowrap'><span className='text-myGreen'>Country: </span> {competition.country_name} </p> )}
            </div>  
        </div>
      </CardBody>
    </Card>
  ) : <> </>
}

export default CompetitionPreviewCard;
