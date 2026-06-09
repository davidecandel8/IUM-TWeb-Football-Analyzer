import React from 'react'
import { useState } from 'react';
import { selectStyle } from '../../utils/commons'
import { ModalHeader, ModalBody, Image, Button, Table, ModalFooter, TableHeader, TableBody, TableRow, TableCell, TableColumn, Select, SelectItem } from '@nextui-org/react'
import { IoIosArrowBack } from "react-icons/io";
import useFetchRanking from '../../hooks/useFetchRanking';
import Loading from '../generalComponents/Loading';
import ErrorMessage from '../generalComponents/ErrorMessage';
import { year } from '../../utils/games_data';
import { formatSeasonYear } from '../../utils/commons';

const heading_voices = ['Position', 'Club', 'Games', 'GS', 'GC', '+/-', 'Pts']

function Ranking({rankingOpen, closeRanking, competition_id }) {

  const [selectedYear, setSelectedYear] = useState(year[year.length - 1].name);
  const {isLoading, isError, ranking , infoMsg} = useFetchRanking(competition_id, selectedYear);
  
  console.log('ranking: ', ranking)
    
  return (
    <>
    <ModalHeader className="flex flex-col text-white text-3xl italic items-center p-2">Ranking</ModalHeader>
    {isLoading ? <Loading /> : isError ? <ErrorMessage msg={infoMsg} /> : (
        <>
        <ModalBody className='text-white'>
            <Table removeWrapper>
            <TableHeader>
                {
                    heading_voices.map((voice, index) => (
                        <TableColumn key={index} className='bg-grey3 text-bold text-sm italic'><p className='text-myGreen'>{voice}</p></TableColumn>
                    ))
                }
            </TableHeader>
            <TableBody>
                {
                    ranking.map((club, index) => (
                        <TableRow key={index}>
                            <TableCell><p className='italic font-bold'>{index + 1}</p></TableCell>
                            <TableCell>
                                <div className='flex flex-row justify-start space-x-2.5 items-center'>
                                    <Image width={20} src={"https://tmssl.akamaized.net/images/wappen/head/" + club.ClubId + ".png"}/><p>{club.Club}</p>
                                </div>
                            </TableCell>
                            <TableCell>{club.GamesPlayed}</TableCell>
                            <TableCell>{club.GoalsScored}</TableCell>
                            <TableCell>{club.GoalsConceded}</TableCell>
                            <TableCell>{club.GoalsDifference}</TableCell>
                            <TableCell>{club.Points}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>    
            </Table>
        </ModalBody>
        <ModalFooter>
            <div className='flex h-full w-full flex-row items-center justify-between'>
                <Select
                className='w-[150px]'
                classNames={{...selectStyle, selectorIcon: 'text-white'}}
                color='success' 
                variant='bordered'
                radius='full' 
                label='Select season' 
                selectedKeys={selectedYear ? [selectedYear] : []}
                onChange={({target}) => {
                    setSelectedYear(target.value);}}
                renderValue={([item])=>{
                        return <p className='text-white text-sm'>
                                {formatSeasonYear(item?.textValue)}
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
                <Button className='bg-myGreen' size='sm' onPress={()=> closeRanking(!rankingOpen)}><div className='flex flex-row items-center'><IoIosArrowBack /><p>Back</p></div></Button>
            </div>  
        </ModalFooter>
        </>
    )}
  </>  
  )  
}

export default Ranking
