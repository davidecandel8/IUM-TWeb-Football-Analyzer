import React from 'react'
import PlayerLineup from './PlayerLineup';
import img from '../../assets/images/field.png';


const AbsolutePlayerContainer = (props)=>{
    const nonNullKeys = Object.keys(props).filter(key => props[key] !== null && props[key] !== undefined);
    const coords= {};
    for(const k of nonNullKeys){
        coords[k] = props[k];
    }

    const isCentrailzedX = props.isCentrailzedX || false;

    const isCentrailzedY = props.isCentrailzedY || false;

    let trasnformProp;

    if(isCentrailzedX && isCentrailzedY){
        trasnformProp = 'translate(-50%, -50%)';
    }
    else if(isCentrailzedX){
        trasnformProp = 'translate(-50%, 0%)';
    }
    else if(isCentrailzedY){
        trasnformProp = 'translate(0%, -50%)';
    }
    else{
        trasnformProp = 'translate(0%, 0%)';
    }


    return (
        <div style={{position: 'absolute', ...coords, 
        transform:  trasnformProp,
        width: props.widthPercent ? `${props.widthPercent}%` : 'auto',
        height: props.heightPercent ? `${props.heightPercent}%` : 'auto'
        }} >
            {props.children}
        </div>
    )
}

function GameLineUp({ gameLineups, clubSelected}) {
  return (
    <div className={" bg-green-500 h-[780px] w-[1020px] relative mb-10"} style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} >


                    <AbsolutePlayerContainer top={"88%"} left={"50%"} isCentrailzedX> 
                        <div style={{ display: 'flex', justifyContent: 'space-between' }} className='gap-6'>
                                {
                                    gameLineups
                                        .filter(player => player.club_id === clubSelected && player.type === 'starting_lineup' && player.position === 'Goalkeeper')
                                        .map((player, index) => {
                                            return ( 
                                                <PlayerLineup player={player} key={index} />
                                            );
                                        })
                                }   
                        </div>
                    </AbsolutePlayerContainer>

                    <AbsolutePlayerContainer top={"76%"} left={"50%"}  isCentrailzedX> 
                        <div style={{ display: 'flex', justifyContent: 'space-between' }} className='gap-6'>
                                {
                                    gameLineups
                                        .filter(player => player.club_id === clubSelected && player.type === 'starting_lineup' && player.position === 'Sweeper')
                                        .map((player, index) => {
                                            return ( 
                                                <PlayerLineup player={player} key={index} />
                                            );
                                        })
                                }   
                        </div>
                    </AbsolutePlayerContainer>

                    <AbsolutePlayerContainer top={"64%"} left={"25%"}  isCentrailzedX> 
                        <div style={{ display: 'flex', justifyContent: 'space-between' }} className='gap-6'>
                                {
                                    gameLineups
                                        .filter(player => player.club_id === clubSelected && player.type === 'starting_lineup' && player.position === 'Left-Back')
                                        .map((player, index) => {
                                            return ( 
                                                <PlayerLineup player={player} key={index} />
                                            );
                                        })
                                }   
                        </div>
                    </AbsolutePlayerContainer>

                    <AbsolutePlayerContainer top={"64%"} left={"50%"}  isCentrailzedX> 
                        <div style={{ display: 'flex', justifyContent: 'space-between' }} className='gap-6'>
                                {
                                    gameLineups
                                        .filter(player => player.club_id === clubSelected && player.type === 'starting_lineup' && player.position === 'Centre-Back')
                                        .map((player, index) => {
                                            return ( 
                                                <PlayerLineup player={player} key={index} />
                                            );
                                        })
                                }   
                        </div>
                    </AbsolutePlayerContainer>

                    <AbsolutePlayerContainer top={"64%"} left={"75%"}  isCentrailzedX> 
                        <div style={{ display: 'flex', justifyContent: 'space-between' }} className='gap-6'>
                                {
                                    gameLineups
                                        .filter(player => player.club_id === clubSelected && player.type === 'starting_lineup' && player.position === 'Right-Back')
                                        .map((player, index) => {
                                            return ( 
                                                <PlayerLineup player={player} key={index} />
                                            );
                                        })
                                }   
                        </div>
                    </AbsolutePlayerContainer>

                    <AbsolutePlayerContainer top={"52%"} left={"50%"}  isCentrailzedX> 
                        <div style={{ display: 'flex', justifyContent: 'space-between' }} className='gap-6'>
                                {
                                    gameLineups
                                        .filter(player => player.club_id === clubSelected && player.type === 'starting_lineup' && player.position === 'Defensive Midfield')
                                        .map((player, index) => {
                                            return ( 
                                                <PlayerLineup player={player} key={index} />
                                            );
                                        })
                                }   
                        </div>
                    </AbsolutePlayerContainer>

                    <AbsolutePlayerContainer top={"40%"} left={"50%"} isCentrailzedX> 
                            <div style={{ display: 'flex', justifyContent: 'space-between' }} className='gap-6'>
                                {
                                    gameLineups
                                        .filter(player => player.club_id === clubSelected && player.type === 'starting_lineup' && player.position === 'Central Midfield')
                                        .map((player, index) => {
                                            return ( 
                                                <PlayerLineup player={player} key={index} />
                                            );
                                        })
                                }   
                            </div>
                    </AbsolutePlayerContainer>

                    <AbsolutePlayerContainer top={"40%"} left={"10%"}  isCentrailzedX> 
                        <div style={{ display: 'flex', justifyContent: 'space-between' }} className='gap-6'>
                                {
                                    gameLineups
                                        .filter(player => player.club_id === clubSelected && player.type === 'starting_lineup' && player.position === 'Left Midfield')
                                        .map((player, index) => {
                                            return ( 
                                                <PlayerLineup player={player} key={index} />
                                            );
                                        })
                                }   
                        </div>
                    </AbsolutePlayerContainer>

                    <AbsolutePlayerContainer top={"40%"} left={"90%"}  isCentrailzedX> 
                        <div style={{ display: 'flex', justifyContent: 'space-between' }} className='gap-6'>
                                {
                                    gameLineups
                                        .filter(player => player.club_id === clubSelected && player.type === 'starting_lineup' && player.position === 'Right Midfield')
                                        .map((player, index) => {
                                            return ( 
                                                <PlayerLineup player={player} key={index} />
                                            );
                                        })
                                }   
                        </div>
                    </AbsolutePlayerContainer>

                    <AbsolutePlayerContainer top={"28%"} left={"50%"}  isCentrailzedX> 
                        <div style={{ display: 'flex', justifyContent: 'space-between' }} className='gap-6'>
                                {
                                    gameLineups
                                        .filter(player => player.club_id === clubSelected && player.type === 'starting_lineup' && player.position === 'Attacking Midfield')
                                        .map((player, index) => {
                                            return ( 
                                                <PlayerLineup player={player} key={index} />
                                            );
                                        })
                                }   
                        </div>
                    </AbsolutePlayerContainer>

                    <AbsolutePlayerContainer top={"16%"} left={"25%"}  isCentrailzedX> 
                        <div style={{ display: 'flex', justifyContent: 'space-between' }} className='gap-6'>
                                {
                                    gameLineups
                                        .filter(player => player.club_id === clubSelected && player.type === 'starting_lineup' && player.position === 'Left Winger')
                                        .map((player, index) => {
                                            return ( 
                                                <PlayerLineup player={player} key={index} />
                                            );
                                        })
                                }   
                        </div>
                    </AbsolutePlayerContainer>

                    <AbsolutePlayerContainer top={"16%"} left={"75%"}  isCentrailzedX> 
                        <div style={{ display: 'flex', justifyContent: 'space-between' }} className='gap-6'>
                                {
                                    gameLineups
                                        .filter(player => player.club_id === clubSelected && player.type === 'starting_lineup' && player.position === 'Right Winger')
                                        .map((player, index) => {
                                            return ( 
                                                <PlayerLineup player={player} key={index} />
                                            );
                                        })
                                }   
                        </div>
                    </AbsolutePlayerContainer>

                    <AbsolutePlayerContainer top={"16%"} left={"50%"}  isCentrailzedX> 
                        <div style={{ display: 'flex', justifyContent: 'space-between' }} className='gap-6'>
                                {
                                    gameLineups
                                        .filter(player => player.club_id === clubSelected && player.type === 'starting_lineup' && player.position === 'Second Striker')
                                        .map((player, index) => {
                                            return ( 
                                                <PlayerLineup player={player} key={index} />
                                            );
                                        })
                                }   
                        </div>
                    </AbsolutePlayerContainer>

                    <AbsolutePlayerContainer top={"4%"} left={"50%"} isCentrailzedX> 
                        <div style={{ display: 'flex', justifyContent: 'space-between' }} className='gap-6'>
                                {
                                    gameLineups
                                        .filter(player => player.club_id === clubSelected && player.type === 'starting_lineup' && player.position === 'Centre-Forward')
                                        .map((player, index) => {
                                            return ( 
                                                <PlayerLineup player={player} key={index} />
                                            );
                                        })
                                }   
                        </div>
                    </AbsolutePlayerContainer>

    </div>
  )
}

export default GameLineUp
