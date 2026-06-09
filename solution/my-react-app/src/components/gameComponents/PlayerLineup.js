import React from 'react';
import { Image } from '@nextui-org/react'
import  NoImg from '../../assets/images/no-player-img.png';

const PlayerLineup = ({ player }) => {
    return (
        <div className="flex flex-col items-center">
            <Image src={!player.player_image_url ? (NoImg) : (player.player_image_url)} className="mx-auto" width={40} />
            <div className="bg-grey3 p-2 rounded mt-1 flex items-center">
                <p className="text-white text-center mr-2 text-xs">{player.number}</p>
                <p className="text-white text-center text-xs">{player.player_name}</p>
            </div>
        </div>
    );
};

export default PlayerLineup;