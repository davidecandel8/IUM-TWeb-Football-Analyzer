import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {Button, ButtonGroup} from "@nextui-org/react";
import useFetchGamesDetails from '../hooks/useFetchGamesDetails';
import GameHeader from '../components/gameComponents/GameHeader';
import GameEvents from '../components/gameComponents/GameEvents';
import GameLineUp from '../components/gameComponents/GameLineUp';
import Loading from '../components/generalComponents/Loading';
import ErrorMessage from '../components/generalComponents/ErrorMessage';
import NotFound from '../components/generalComponents/NotFound';
import { formatClubName } from '../utils/commons';


const GamesDetailsScreen = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const serializedGame = searchParams.get('game');
    const game = JSON.parse(decodeURIComponent(serializedGame));

    const { game_id, home_club_id, home_club_name, home_club_goals, away_club_id, away_club_name, away_club_goals } = game;
    let { gameEvents, gameLineups, loading, error, infoMsg, foundEvents, foundLineUps } = useFetchGamesDetails(game_id);
    
    const [clubSelected, setClubSelected] = useState(home_club_id);

    const sortedGameEvents = gameEvents.sort((a, b) => parseInt(a.minute) - parseInt(b.minute));
   
    return (
        <>
            <GameHeader home_club_name={home_club_name} home_club_goals={home_club_goals} away_club_name={away_club_name} away_club_goals={away_club_goals} home_club_id={home_club_id} away_club_id={away_club_id}/>
            {loading ? (<Loading/>) : (error ? (< ErrorMessage msg={infoMsg}/>) : 
            <>
                {foundEvents && gameEvents ? <GameEvents sortedGameEvents={sortedGameEvents} home_club_id={home_club_id} away_club_id={away_club_id}/> : <NotFound infoMsg="No events found for this match"/>}
                <div className="flex flex-col items-center justify-center">
                    <ButtonGroup className="w-[700px] pt-10 pb-10">
                        <Button 
                            size='lg' 
                            className={`flex-grow ${clubSelected === home_club_id ? 'bg-grey3 text-myGreen' : 'bg-grey3 text-white'}`} 
                            variant='solid' 
                            radius='full' 
                            onClick={() => setClubSelected(home_club_id)}
                        >
                            {!home_club_name ? ('Home Club') : (formatClubName(home_club_name))}
                        </Button>
                        <Button 
                            size='lg' 
                            className={`flex-grow ${clubSelected === away_club_id ? 'bg-grey3 text-myGreen' : 'bg-grey3 text-white'}`} 
                            variant='solid' 
                            radius='full' 
                            onClick={() => setClubSelected(away_club_id)}
                        >
                            {!away_club_name ? ('Away Club') : (formatClubName(away_club_name))}
                        </Button>
                    </ButtonGroup>
                    {foundLineUps && gameLineups ? <GameLineUp gameLineups={gameLineups} clubSelected={clubSelected}/> : <NotFound msg="No lineups found for this match"/>}
                </div>
            </>)}
           
        </>
    );
};

export default GamesDetailsScreen;


