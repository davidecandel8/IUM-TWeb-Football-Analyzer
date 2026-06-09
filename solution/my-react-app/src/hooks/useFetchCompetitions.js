import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export const NAME = 1;
export const COUNTRY = 2;
export const TYPE = 3;
export const COMPETITIONS_BY_PAGE = 15;

const useFetchClubs = () => {

    const navigate = useNavigate();
    const { paramCompName } = useParams();

    const [competitions, setCompetitions] = useState([])
    
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isFound, setIsFound] = useState(true);
    const [endPage, setEndPage] = useState(false);
    const [infoMsg, setInfoMsg] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [btnLoadMore, setBtnLoadMore] = useState(false);
    const [reset, setReset] = useState(true);


    const [competitionName, setCompetitionName] = useState('');
    const [country, setCountry] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        if(paramCompName){
            setCompetitionName(paramCompName);
            setReset(false);
        } else if(localStorage.getItem('default_competitions')){
            setCompetitions(JSON.parse(localStorage.getItem('default_competitions')));
            setIsLoading(false);
        } else {
        (async()=>{
            setIsError(false);
            setIsLoading(true);

            try{
                const data = await axios.get('http://localhost:3000/competitions/main/get_competitions')
                setCompetitions(data.data);
                localStorage.setItem('default_competitions', JSON.stringify(data.data));
                console.log(data);
            } catch(err) {
                setIsError(true);
                setInfoMsg('An error occurred while loading clubs, please retry');
            }
            setIsLoading(false);

        })()}
    }, [paramCompName])

    useEffect(() => {
        if(competitionName || country || type){
            const timeoutId = setTimeout(async () => {
                setIsError(false);
                setIsLoading(true)
                setIsFound(false); 
                try{
                    const data = await axios.get(`http://localhost:3000/competitions/main/get_filtered_competitions`,
                        {
                            params: {
                                competitionName,
                                country,
                                type,
                                limit: COMPETITIONS_BY_PAGE,
                                offset: currentPage
                            }
                        }
                    )
                    if(data.data.length === 0){
                        if(currentPage > 0){
                            setBtnLoadMore(false);
                            setEndPage(true);
                            setIsFound(true);
                        }else{
                            setCompetitions([]); 
                            setIsFound(false);
                            setBtnLoadMore(false);
                            setInfoMsg('No competitions found for these filters, please try again with different filters');
                        }
                    }else{
                        setIsFound(true);
                        if(currentPage === 0){
                            setCompetitions(data.data);
                        } else {
                            setCompetitions(prevCompetitions => [...prevCompetitions, ...data.data]);
                        }if(data.data.length === COMPETITIONS_BY_PAGE){
                            setBtnLoadMore(true);
                        }else{
                            setBtnLoadMore(false);
                            setEndPage(false);
                        }
                    }
                } catch(err) {
                    setIsError(true);
                    setInfoMsg('An error occurred while loading competitions, please retry');
                }
                setIsLoading(false);   
        }, 1000)
        return () => clearTimeout(timeoutId);
        }
    }, [competitionName, country, type, currentPage])

    const handleFilterChange = ({value, type}) => {
        setEndPage(false);
        setCurrentPage(0);
        setReset(false);

        if(type === NAME){
            setCompetitionName(value);
            return;
        }
        if(type === COUNTRY){
            setCountry(value);
            return;
        }
        if(type === TYPE){
            setType(value);
            return;
        }
    }

    const loadMore = () => {
        setBtnLoadMore(false);
        setCurrentPage(prevPage => prevPage + 1);
    }

    const resetFilters = () => {
        setCompetitionName('');
        setCountry('');
        setType('');
        setEndPage(false);
        setIsFound(true);
        setIsError(false);
        setCurrentPage(0);
        setBtnLoadMore(false);
        setReset(true);
        setCompetitions(JSON.parse(localStorage.getItem('default_competitions')));
        if(paramCompName){
            navigate('/competitions');
        }
    }

    return {isLoading, competitions, isError, infoMsg, competitionName, country, type, isFound, btnLoadMore, endPage, handleFilterChange, resetFilters, loadMore, reset }
}

export default useFetchClubs;