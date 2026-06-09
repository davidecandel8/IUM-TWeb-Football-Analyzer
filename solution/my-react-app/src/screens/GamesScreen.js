import React from 'react'
import {Button} from "@nextui-org/react";
import { Link } from 'react-router-dom';
import FilterGames from "../components/gameComponents/FilterGames";
import GamesCard from "../components/gameComponents/GamesCard";
import useFetchGames from '../hooks/useFetchGames';
import Loading from '../components/generalComponents/Loading'
import ErrorMessage from '../components/generalComponents/ErrorMessage'
import NotFound from '../components/generalComponents/NotFound'
import { formatClubName } from '../utils/commons';

function GamesScreen() {
    const { games, loading, error, found, infoMsg, endPage, showBtnLoadMore, start, reset, selectedCompetition, selectedCompetitionType, selectedYear, selectedRound, disableRound, handleFilterChange, resetFilters, loadMore} = useFetchGames();

    return (
        <div className='flex h-full flex-col mt-10'>
            <FilterGames handleFilterChange={handleFilterChange} resetFilters={resetFilters} reset={reset} selectedCompetition={selectedCompetition} selectedCompetitionType={selectedCompetitionType} selectedRound={selectedRound} disableRound={disableRound} selectedYear={selectedYear}/>
            { loading ? <Loading /> : error ? <ErrorMessage msg={infoMsg}/> : start ? <div className='flex flex-col h-full items-center justify-center mt-60'><p className='text-gray-200 text-2xl'>Select filters to find games</p></div> : found ? (
              <div className=' grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 mb-10 ml-10 mr-10'>
                 {games.map((game) => (
                  <Link key={game.game_id} to={`/gamesDetails?game=${encodeURIComponent(JSON.stringify(game))}`}>
                    <GamesCard
                      home_club_name={!game.home_club_name ? ('Unavailable team name') : formatClubName(game.home_club_name)}
                      away_club_name={!game.away_club_name ? ('Unavailable team name') : formatClubName(game.away_club_name)}
                      home_club_goals={game.home_club_goals}
                      away_club_goals={game.away_club_goals}
                      home_club_image={`https://tmssl.akamaized.net/images/wappen/head/${game.home_club_id}.png`}
                      away_club_image={`https://tmssl.akamaized.net/images/wappen/head/${game.away_club_id}.png`}
                    />
                  </Link>
                ))}
              </div>
              ) : <NotFound msg={infoMsg} /> 
            }
            {
            showBtnLoadMore ? (
              <div className="flex justify-center mb-10">
                <Button size='lg' className='bg-myGreen' variant='solid' radius='full' onClick={loadMore}>Load More</Button>
              </div>
            ) : (endPage ? <div className='flex justify-center mb-10'><p className='text-gray-500'>No more games found for these filters.</p></div> : null)
            }
          </div>
        )
}

export default GamesScreen
