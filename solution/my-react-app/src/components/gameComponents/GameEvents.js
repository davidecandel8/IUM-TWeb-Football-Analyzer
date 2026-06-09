import React from 'react'
import {Image} from "@nextui-org/react";

function GameEvents({ sortedGameEvents, home_club_id, away_club_id }) {
    console.log('valore di sortedGameEvents: ' + sortedGameEvents + ' valore di home_club_id: ' + home_club_id + ' valore di away_club_id: ' + away_club_id)
  return (
    <div className="flex flex-col items-center mt-10 pt-5 pb-10 pl-5 pr-5 border-b-3 border-grey3">
        <ul className="w-1/2">
            {sortedGameEvents && sortedGameEvents.map((event, index) => (
            <li
                key={index}
                className={`flex items-center mb-5`}
            >
                {/* Descrizione evento per la squadra di casa */}
                {event.club_id === home_club_id ? (
                <div className="w-2/5 p-3 bg-grey3 rounded-lg text-right">
                    {event.type === 'Cards' ? (
                    <div className="flex justify-end items-center">
                        <p className="text-white font-semibold mr-5">{!event.player_name ? ('No additional info') : (event.player_name)}</p>
                        <div>
                            {event.description.includes('Yellow') ? 
                                <Image 
                                    src="https://oneftbl-cms.imgix.net/https%3A%2F%2Fimages.onefootball.com%2Fcw%2Ficons%2Fyellow-card-light.svg?auto=format%2Ccompress&crop=faces&dpr=2&fit=crop&h=24&q=25&w=24&s=fcdc44e9c82846d843bae3fe16dd0a81" 
                                    alt="Yellow Card Icon" 
                                    width={30} 
                                    height={30} 
                                /> 
                                : event.description.includes('Red') ? 
                                <Image 
                                    src="https://oneftbl-cms.imgix.net/https%3A%2F%2Fimages.onefootball.com%2Fcw%2Ficons%2Fred-card-dark.svg?auto=format%2Ccompress&crop=faces&dpr=2&fit=crop&h=24&q=25&w=24&s=12ea48bb31a9d6cf17f502281047ea93" 
                                    alt="Red Card Icon" 
                                    width={30} 
                                    height={30} 
                                /> : ''}
                        </div>
                    </div>
                    ) : event.type === 'Goals' ? (
                        <div className="flex justify-end items-center">
                            <div className="mr-5">
                                <p className="text-white font-semibold"> {!event.player_name ? ('No additional info') : (event.player_name)}</p>
                                {event.player_assist_name !== '' && <p className="text-gray-300 text-sm"> Assist: {event.player_assist_name}</p>}
                            </div>
                            <Image 
                                src="https://oneftbl-cms.imgix.net/https%3A%2F%2Fimages.onefootball.com%2Fcw%2Ficons%2Fgoal-dark.svg?auto=format%2Ccompress&crop=faces&dpr=2&fit=crop&h=24&q=25&w=24&s=e4ba345d35e1b099bf0e05b57b6ab288" 
                                alt="Goal Icon" 
                                width={30} 
                                height={30} 
                            /> 
                        </div>
                    ) : event.type === 'Substitutions' ? (                              
                        <div className="flex justify-end items-center">
                            <div className="mr-5">
                                {!event.player_name || !event.player_in_name ? (<p className='text-white font-semibold'>No additional info</p>) : (
                                    <>
                                    <p className="text-white font-semibold">{event.player_in_name}</p>
                                    <p className="text-gray-300 text-sm">{event.player_name}</p>
                                    </>
                                )}
                            </div>
                            <Image 
                                src="https://oneftbl-cms.imgix.net/https%3A%2F%2Fimages.onefootball.com%2Fcw%2Ficons%2Fsubstitution.svg?auto=format%2Ccompress&crop=faces&dpr=2&fit=crop&h=24&q=25&w=24&s=58d0a80de602e4058b19e137a838bfe1" 
                                alt="Substitutions Icon" 
                                width={30} 
                                height={30} 
                            /> 
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                ) : (
                    <div className="w-2/5"></div>
                )}
                {/* Minuto */}
                <div className="w-1/5 flex justify-center">
                <div className="w-10 h-10 flex items-center justify-center" style={{ minHeight: '24px' }}>
                    <p className="text-white font-bold">{event.minute}'</p>
                </div>
                </div>
                {/* Descrizione evento per la squadra ospite */}
                {event.club_id === away_club_id ? (
                <div className="w-2/5 p-3 bg-grey3 rounded-lg text-left">
                    {event.type === 'Cards' ? (
                    <div className="flex justify-start items-center">
                        <div className=" mr-5">
                            {event.description.includes('Yellow') ? 
                                <Image 
                                    src="https://oneftbl-cms.imgix.net/https%3A%2F%2Fimages.onefootball.com%2Fcw%2Ficons%2Fyellow-card-light.svg?auto=format%2Ccompress&crop=faces&dpr=2&fit=crop&h=24&q=25&w=24&s=fcdc44e9c82846d843bae3fe16dd0a81" 
                                    alt="Yellow Card Icon" 
                                    width={30} 
                                    height={30} 
                                /> 
                                : event.description.includes('Red') ? 
                                <Image 
                                    src="https://oneftbl-cms.imgix.net/https%3A%2F%2Fimages.onefootball.com%2Fcw%2Ficons%2Fred-card-dark.svg?auto=format%2Ccompress&crop=faces&dpr=2&fit=crop&h=24&q=25&w=24&s=12ea48bb31a9d6cf17f502281047ea93" 
                                    alt="Red Card Icon" 
                                    width={30} 
                                    height={30} 
                                /> : ''}
                        </div>
                        <p className="text-white font-semibold">{!event.player_name ? ('No additional info') : (event.player_name)}</p>
                    </div>
                    ) : event.type === 'Goals' ? (
                        <div className="flex justify-start items-center">
                            <div className='mr-5'>
                                <Image 
                                    src="https://oneftbl-cms.imgix.net/https%3A%2F%2Fimages.onefootball.com%2Fcw%2Ficons%2Fgoal-dark.svg?auto=format%2Ccompress&crop=faces&dpr=2&fit=crop&h=24&q=25&w=24&s=e4ba345d35e1b099bf0e05b57b6ab288" 
                                    alt="Goal Icon" 
                                    width={30} 
                                    height={30} 
                                /> 
                            </div>
                            <div>
                                <p className="text-white font-semibold"> {!event.player_name ? ('No additional info') : (event.player_name)}</p>
                                {event.player_assist_name !== '' && <p className="text-gray-300 text-sm"> Assist: {event.player_assist_name}</p>}
                            </div>
                        </div>
                    ) : event.type === 'Substitutions' ? (                              
                        <div className="flex justify-start items-center">
                            <div className='mr-5'>
                                <Image 
                                    src="https://oneftbl-cms.imgix.net/https%3A%2F%2Fimages.onefootball.com%2Fcw%2Ficons%2Fsubstitution.svg?auto=format%2Ccompress&crop=faces&dpr=2&fit=crop&h=24&q=25&w=24&s=58d0a80de602e4058b19e137a838bfe1" 
                                    alt="Substitutions Icon" 
                                    width={30} 
                                    height={30} 
                                /> 
                            </div>
                            <div className="mr-5">
                                {!event.player_name || !event.player_in_name ? (<p className='text-white font-semibold'>No additional info</p>) : (
                                    <>
                                    <p className="text-white font-semibold">{event.player_in_name}</p>
                                    <p className="text-gray-300 text-sm">{event.player_name}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                ) : (
                    <div className="w-2/5"></div>
                )}
            </li>
            ))}
        </ul>
    </div>
  )
}

export default GameEvents
