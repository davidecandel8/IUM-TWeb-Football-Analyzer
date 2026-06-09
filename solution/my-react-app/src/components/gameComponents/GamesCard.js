import { Card, CardBody, Image } from "@nextui-org/react";
import React from "react";

function GamesCard({home_club_name, away_club_name, home_club_goals, away_club_goals, home_club_image, away_club_image }) {

    return (
        <Card className='flex flex-col gap-4 bg-grey3'>
            <CardBody className='flex flex-col gap-5'>
                <div className='flex flex-col gap-2'>
                        <div className='flex flex-row items-center gap-2'>
                            <Image src={home_club_image} alt={home_club_name} width={30} height={30} />
                            <div className='flex flex-row items-center justify-between w-full'>
                                <p className='text-lg italic text-white'>
                                    {home_club_name}
                                </p>
                                <p className='text-lg italic text-white'>
                                    {home_club_goals}
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                            <Image src={away_club_image} alt={away_club_name} width={30} height={30}/>
                            <div className='flex flex-row items-center justify-between w-full'>
                                <p className='text-lg italic text-white'>
                                    {away_club_name}
                                </p>
                                <p className='text-lg italic text-white'>
                                    {away_club_goals}
                                </p>
                            </div>
                        </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default GamesCard;
