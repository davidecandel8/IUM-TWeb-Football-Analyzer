import React from 'react'
import { Image} from "@nextui-org/react";
import {Link} from 'react-router-dom'
import { formatClubName } from '../../utils/commons';

function GameHeader({home_club_name, home_club_id, home_club_goals, away_club_goals, away_club_id, away_club_name}) {
  return (
    <div className="flex justify-center h-54 p-5 mt-10 border-t-3 border-b-3 border-grey3 ">
        <div className=" w-2/5 flex items-center justify-end">
            { !home_club_name ? <p className="text-white text-3xl font-bold">Unavailable team name</p> : (
                <Link className='text-white text-3xl font-bold cursor-pointer' to={`/clubs/${formatClubName(home_club_name)}`}>{formatClubName(home_club_name)}</Link>
            )}
            <div className="ml-10">
                <Image src={`https://tmssl.akamaized.net/images/wappen/head/${home_club_id}.png`} alt={formatClubName(home_club_name)} width={100}/>
            </div>
        </div>
        <div className=" w-1/5 flex items-center justify-center">
            <p className="text-white mr-10 ml-10 text-5xl font-bold">{home_club_goals}</p>
            <p className="text-white text-5xl font-bold">:</p>
            <p className="text-white ml-10 mr-10 text-5xl font-bold">{away_club_goals}</p>
        </div>
        <div className=" w-2/5 flex items-center justify-start">
            <div className="mr-10">
                <Image src={`https://tmssl.akamaized.net/images/wappen/head/${away_club_id}.png`} alt={formatClubName(away_club_name)} width={100}/>
            </div>
            { !away_club_name ? <p className="text-white text-3xl font-bold">Unavailable team name</p> : (
                <Link className='text-white text-3xl font-bold cursor-pointer' to={`/clubs/${formatClubName(away_club_name)}`}>{formatClubName(away_club_name)}</Link>
            )}
        </div>
    </div>  
  )
}

export default GameHeader
