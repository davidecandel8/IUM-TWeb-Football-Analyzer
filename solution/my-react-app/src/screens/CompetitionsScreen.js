import React from 'react'
import { useState } from 'react'
import useFetchCompetitions from '../hooks/useFetchCompetitions'
import ModalCompetitionCard from '../components/competitionComponents/ModalCompetitionCard'
import CompetitionPreviewCard from '../components/competitionComponents/CompetitionPreviewCard'
import FilterCompetitions from '../components/competitionComponents/FilterCompetitions'
import Loading from '../components/generalComponents/Loading'
import ErrorMessage from '../components/generalComponents/ErrorMessage'
import NotFound from '../components/generalComponents/NotFound'
import { Button } from '@nextui-org/react'

function CompetitionsScreen() {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCompetition, setSelectedCompetition] = useState(0);

  const {isLoading, competitions, isError, infoMsg, competitionName, country, type, isFound, btnLoadMore, endPage, handleFilterChange, resetFilters, loadMore, reset } = useFetchCompetitions();

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  const openModalHandler = (index) => 
    () => {
      setSelectedCompetition(index);
      openModal();
  }

  return (
    <div className='flex flex-col mt-10'>
      <FilterCompetitions handleFilterChange={handleFilterChange} resetFilters={resetFilters} competitionName={competitionName} country={country} type={type} reset={reset}/>
      {isLoading ? <Loading /> : isError ? <ErrorMessage msg={infoMsg}/> : isFound ? (
    <>
      <div className=' grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-10 ml-10 mr-10'>
        {
          competitions.map((competition, index) => {
            return <CompetitionPreviewCard key={index} openModal={openModalHandler(index)}  {...competition} />
          })
        }
      </div>
      {competitions && competitions.length > 0 && <ModalCompetitionCard isModalOpen={isModalOpen} closeModal={closeModal} competition_info={competitions[selectedCompetition]} />}
    </>
    ) : <NotFound msg={infoMsg} />}
    {
      btnLoadMore ? (
        <div className="flex justify-center mb-10">
          <Button size='lg' className='bg-myGreen' variant='solid' radius='full' onClick={loadMore}>Load More</Button>
        </div>
      ) : (endPage ? <div className="flex justify-center mb-10"> <p className='text-gray-500'>No more competitions found for these filters.</p></div> : null)      
    }
  </div>
  )
}

export default CompetitionsScreen
