import React from 'react'
import { Select, SelectItem, Input, Button, Avatar } from '@nextui-org/react'
import { inputStyle, selectStyle } from '../../utils/commons'
import { MdClear } from "react-icons/md";
import { NAME, COMPETITION, COUNTRY } from '../../hooks/useFetchClubs';
import { competitionsFormatted } from '../../utils/competitions';
import { countries } from '../../utils/country';

function FilterClubs({handleFilterChange, resetFilters, clubName, competition, country, reset, disableCountry}){

    return (
        <div className='flex flex-row justify-center gap-4 items-center'>
        <Input value={clubName} className='w-[300px] h-[50px]' classNames={inputStyle} color='success' variant='faded' radius='full' placeholder='Search by Club Name' onValueChange={(value)=>handleFilterChange({value: value, type: NAME})}/>
        
        <Select className='w-[300px] h-[50px]' classNames={{
          ...selectStyle,
          selectorIcon: 'text-white'
  
      }} color='success' variant='faded' radius='full' label='Search by Domestic Competition (2023)' renderValue={([item])=>{
          return <p className='text-white'>
            {item?.textValue}
          </p>
        }} selectedKeys={competition ? [competition] : []} onChange={e => {
  
          handleFilterChange({value: e.target.value, type: COMPETITION})
  
        }} items={competitionsFormatted}> 
          { 
          ({name,id}) => (
            <SelectItem key={id} value={name} startContent={<Avatar alt="Competition Logo" className="w-6 h-6" src={`https://tmssl.akamaized.net/images/logo/header/${id.toLowerCase()}.png`} />}>
                {name}
            </SelectItem>
        )}
        </Select>

        <Select className='w-[300px] h-[50px]' classNames={{
          ...selectStyle,
          selectorIcon: 'text-white'
  
      }} color='success' variant='faded' radius='full' label='Search by Country' renderValue={([item])=>{
          return <p className='text-white'>
            {item?.textValue}
          </p>
        }} selectedKeys={country ? [country] : []} onChange={e => {
  
          handleFilterChange({value: e.target.value, type: COUNTRY})
  
        }} items={countries} isDisabled={disableCountry}> 
          { ({name, competition_id, country_id}) => (
            <SelectItem key={competition_id} value={name} startContent={<Avatar alt="Country Logo" className="w-6 h-6" src={`https://tmssl.akamaized.net/images/flagge/headerRund/${country_id}.png`} />}>
              {name}
            </SelectItem>
          )}
        </Select>
        
        <Button isDisabled={reset} className='h-[55px] bg-myGreen' variant='solid' radius='full' onClick={resetFilters}>Clear Filters<MdClear /></Button>
      </div>
    )
}
export default FilterClubs