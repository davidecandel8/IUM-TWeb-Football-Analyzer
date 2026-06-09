import React from 'react'
import HomeCard from '../components/generalComponents/HomeCard'
import cards_data from '../utils/home_cards_data'

function HomeScreen() {
  return (
    <>
      <div className='flex flex-row flex-wrap gap-5 justify-center items-center h-auto mt-12'>
        {
          cards_data.map((card, index) => {
            return <HomeCard key={index} title={card.title} description={card.description} img={card.img} link={card.link} />
          })
        }
      </div>
    </>
  )
}

export default HomeScreen
