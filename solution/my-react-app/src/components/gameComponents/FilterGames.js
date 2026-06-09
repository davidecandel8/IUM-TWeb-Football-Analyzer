import {Button, Select, SelectItem, Avatar } from "@nextui-org/react";
import React from "react";
import {COMPETITION, YEAR, ROUND} from "../../hooks/useFetchGames"
import {competitions, year, round_domestic_league, round_domestic_cup, round_international_cup, round_other} from "../../utils/games_data"
import { selectStyle } from '../../utils/commons'
import { MdClear } from "react-icons/md";


function FilterGames({
    handleFilterChange,
    resetFilters,
    selectedCompetition,
    selectedCompetitionType,
    selectedYear,
    selectedRound,
    disableRound,
    reset
}) {

    return (
            <div className='flex flex-row justify-center gap-4 items-center'>
                <Select
                    className='w-[300px] h-[50px]'
                    classNames={{...selectStyle, selectorIcon: 'text-white'}}
                    color='success'
                    variant='bordered'
                    radius='full'
                    label='Search by Competitions'
                    selectedKeys={selectedCompetition ? [selectedCompetition] : []}
                    onChange={({target})=>{
                        handleFilterChange({value: target.value, type: COMPETITION});
                    }}
                    renderValue={([item])=>{
                        return <p className='text-white'>
                          {item?.textValue}
                        </p>}}
                    items={competitions}    
                    >
                    {
                        ({name,id}) => (
                            <SelectItem key={id} value={name} startContent={<Avatar alt="Competition Logo" className="w-6 h-6" src={`https://tmssl.akamaized.net/images/logo/header/${id.toLowerCase()}.png`} />}>
                                {name}
                            </SelectItem>
                        )
                    }
                </Select>
                <Select 
                    className='w-[300px] h-[50px]'
                    classNames={{...selectStyle, selectorIcon: 'text-white'}}
                    color='success' 
                    variant='bordered'
                    radius='full' 
                    label='Search by Year' 
                    selectedKeys={selectedYear ? [selectedYear] : []}
                    onChange={({target}) => {
                        handleFilterChange({value: target.value, type: YEAR});
                    }}
                    renderValue={([item])=>{
                        return <p className='text-white'>
                          {item?.textValue}
                        </p>}}
                    items={year}
                >
                    {
                        ({name}) => (
                            <SelectItem key={name} value={name}>
                                {name}
                            </SelectItem>
                        )
                    }

                </Select>
                <Select 
                    className='w-[300px] h-[50px]'
                    classNames={{...selectStyle, selectorIcon: 'text-white'}}
                    color='success' 
                    variant='bordered'
                    radius='full' 
                    label='Search by Round' 
                    selectedKeys={selectedRound ? [selectedRound] : []}
                    onChange={({target}) => {
                        handleFilterChange({value: target.value, type: ROUND});
                    }}
                    renderValue={([item])=>{
                        return <p className='text-white'>
                          {item?.textValue}
                        </p>}}
                    items={selectedCompetitionType === 'domestic_league' ? round_domestic_league : selectedCompetitionType === 'domestic_cup' ? round_domestic_cup : selectedCompetitionType === 'international_cup' ? round_international_cup : round_other} isDisabled={disableRound} 
                >
                     {
                        ({name}) => (
                            <SelectItem key={name} value={name}>
                                {name}
                            </SelectItem>
                        )
                    }
                </Select>
                <Button isDisabled={reset} className='h-[55px] bg-myGreen' variant='solid' radius='full' onClick={resetFilters}>Clear Filters<MdClear /></Button>
            </div>
    )
}

export default FilterGames