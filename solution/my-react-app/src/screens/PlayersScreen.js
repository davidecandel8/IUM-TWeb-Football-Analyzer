import React from 'react'
import { useState} from 'react'
import useFetchPlayers from '../hooks/useFetchPlayers'
import PlayerPreviewCard from '../components/playerComponents/PlayerPreviewCard'
import ModalPlayerCard from '../components/playerComponents/ModalPlayerCard'
import FilterPlayers from '../components/playerComponents/FilterPlayers'
import Loading from '../components/generalComponents/Loading'
import ErrorMessage from '../components/generalComponents/ErrorMessage'
import NotFound from '../components/generalComponents/NotFound'
import { Button } from '@nextui-org/react'

function PlayersScreen() {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const {isLoading, players, isError, infoMsg, playerName, teamName, position, handleFilterChange, resetFilters, isFound, loadMore, showBtnLoadMore, endPage, reset} = useFetchPlayers();

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  const openModalHandler = (index) => 
    () => {
      setSelectedPlayer(index);
      openModal();
  }

  console.log('players: ' + JSON.stringify(players) + "founded: " + isFound + ' msg: ' + infoMsg)

  return (
        <div className='flex flex-col mt-10'>
              <FilterPlayers handleFilterChange={handleFilterChange} resetFilters={resetFilters} teamName={teamName} playerName={playerName} position={position} reset={reset}/>
          {isLoading ? <Loading /> : isError ? <ErrorMessage msg={infoMsg} />  : isFound ? (
          <>
            <div className=' grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-10 ml-10 mr-10'>
              {
                players.map((player, index) => {
                  return <PlayerPreviewCard key={index} openModal={openModalHandler(index)}  {...player} />
                })
              }
            </div>
            {players && players.length > 0 && selectedPlayer !== null && <ModalPlayerCard isModalOpen={isModalOpen} closeModal={closeModal} player_info={players[selectedPlayer]} />}          </>
          ) : <NotFound msg={infoMsg} />}
          {
            showBtnLoadMore ? (
              <div className="flex justify-center mb-10">
                <Button size='lg' className='bg-myGreen' variant='solid' radius='full' onClick={loadMore}>Load More</Button>
              </div>
            ) : (endPage ? <div className='flex justify-center mb-10'><p className='text-gray-500'>No more players found for these filters.</p></div> : null)
          }
       </div>
    )
}

export default PlayersScreen
