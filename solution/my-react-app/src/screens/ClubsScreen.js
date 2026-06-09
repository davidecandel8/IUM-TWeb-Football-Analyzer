import React from 'react'
import { useState} from 'react'
import useFetchClubs from '../hooks/useFetchClubs'
import ClubPreviewCard from '../components/clubComponents/ClubPreviewCard'
import ModalClubCard from '../components/clubComponents/ModalClubCard'
import FilterClubs from '../components/clubComponents/FilterClubs'
import Loading from '../components/generalComponents/Loading'
import ErrorMessage from '../components/generalComponents/ErrorMessage'
import NotFound from '../components/generalComponents/NotFound'
import { Button } from '@nextui-org/react'

function ClubsScreen() {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedClub, setSelectedClub] = useState(0);


  const {isLoading, clubs, isError, infoMsg, clubName, competition, country, isFound, btnLoadMore, endPage, handleFilterChange, resetFilters, loadMore, reset, disableCountry } = useFetchClubs();

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  const openModalHandler = (index) => 
    () => {
      setSelectedClub(index);
      openModal();
  }



  return (
    <div className='flex flex-col mt-10'>
        <FilterClubs handleFilterChange={handleFilterChange} resetFilters={resetFilters} clubName={clubName} competition={competition} country={country} reset={reset} disableCountry={disableCountry}/>
      {isLoading ? <Loading /> : isError ? <ErrorMessage msg={infoMsg}/> : isFound ? (
    <>
      <div className=' grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-10 ml-10 mr-10'>
        {
          clubs.map((club, index) => {
            return <ClubPreviewCard key={index} openModal={openModalHandler(index)}  {...club} />
          })
        }
      </div>
      {clubs && clubs.length > 0 && <ModalClubCard isModalOpen={isModalOpen} closeModal={closeModal} club_info={clubs[selectedClub]} />}
    </>
    ) : <NotFound msg={infoMsg} />}
    {
      btnLoadMore ? (
        <div className="flex justify-center mb-10">
          <Button size='lg' className='bg-myGreen' variant='solid' radius='full' onClick={loadMore}>Load More</Button>
        </div>
      ) : (endPage ? <div className="flex justify-center mb-10"> <p className='text-gray-500'>No more clubs found for these filters.</p></div> : null)      
    }
  </div>
  )
}

export default ClubsScreen
