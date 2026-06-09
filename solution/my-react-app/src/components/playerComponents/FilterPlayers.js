import React from 'react'
import {NAME, TEAM, POSITION} from '../../hooks/useFetchPlayers'
import { Select, SelectItem, Input, Button } from '@nextui-org/react'
import { inputStyle, selectStyle } from '../../utils/commons'
import { MdClear } from "react-icons/md";


const positions = [{name: 'Goalkeeper', id: 0}, {name: 'Defender', id: 1}, {name: 'Midfield', id: 3}, {name: 'Attack', id:4}] 


function FilterPlayers({handleFilterChange, resetFilters, playerName, teamName, position, reset}) {

 
  return (
    <div className='flex flex-row justify-center gap-4 items-center'>
      <Input value={playerName} className='w-[300px] h-[50px]' classNames={inputStyle} color='success' variant='faded' radius='full' placeholder='Search by player name' onValueChange={(value)=>handleFilterChange({value: value, type: NAME})}/>
      <Input value={teamName} className='w-[300px] h-[50px]' classNames={inputStyle} color='success' variant='faded' radius='full' placeholder='Search by team name' onValueChange={(value)=>handleFilterChange({value: value, type: TEAM})}/> 
      <Select className='w-[300px] h-[50px]' classNames={{
        ...selectStyle,
        selectorIcon: 'text-white'

    }} color='success' variant='faded' radius='full' label='Search by position' renderValue={([item])=>{
        return <p className='text-white'>
          {item?.textValue}
        </p>
      }} selectedKeys={position ? [position] : []} onChange={e => {

        handleFilterChange({value: e.target.value, type: POSITION})

      }} items={positions}> 
        { ({name, id}) => (
          <SelectItem key={name} value={name}>{name}</SelectItem>
        )}
      </Select>
      <Button isDisabled={reset} className='h-[55px] bg-myGreen' variant='solid' radius='full' onClick={resetFilters}>Clear Filters<MdClear /></Button>
    </div>
  )
}

export default FilterPlayers
