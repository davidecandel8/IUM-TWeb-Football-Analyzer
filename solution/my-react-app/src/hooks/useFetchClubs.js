import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const NAME = 1;
export const COMPETITION = 2;
export const COUNTRY = 3;
export const CLUBS_BY_PAGE = 15;

const useFetchClubs = () => {

    const navigate = useNavigate();
    const { paramClubName } = useParams();
    console.log(paramClubName)

    const [clubs, setClubs] = useState([])

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isFound, setIsFound] = useState(true);
    const [endPage, setEndPage] = useState(false);
    const [infoMsg, setInfoMsg] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [btnLoadMore, setBtnLoadMore] = useState(false);
    const [reset, setReset] = useState(true);
    const [disableCountry, setDisableCountry] = useState(false);    
    
    const [clubName, setClubName] = useState('');
    const [competition, setCompetition] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
  
        if(paramClubName){

            setClubName(paramClubName);
            setReset(false);

        } else if(localStorage.getItem('default_clubs')){ 

            setClubs(JSON.parse(localStorage.getItem('default_clubs')))
            setIsLoading(false);

        } else {
        (async()=>{
            setIsError(false);
            setIsLoading(true);

                try{
                    const data = await axios.get('http://localhost:3000/clubs/main/get_clubs')
                    setClubs(data.data);
                    console.log(data);
                    localStorage.setItem('default_clubs', JSON.stringify(data.data));
                } catch(err) {
                    setIsError(true);
                    setInfoMsg('An error occurred while loading clubs, please retry');
                }
            
            setIsLoading(false);

        })()}
    }, [paramClubName])

    useEffect(() => {
        if(clubName || competition || country){
            const timeoutId = setTimeout(async () => {
                setIsError(false);
                setIsLoading(true)
                setIsFound(false);
                try{
                    const data = await axios.get(`http://localhost:3000/clubs/main/get_filtered_clubs`,
                        {
                            params: {
                                clubName,
                                competition,
                                country,
                                limit: CLUBS_BY_PAGE,
                                offset: currentPage
                            }
                        }
                    )
                    if(data.data.length === 0){
                        if(currentPage>0){
                            setBtnLoadMore(false);
                            setEndPage(true);
                            setIsFound(true);
                        }else{
                            setClubs([]); 
                            setIsFound(false);
                            setBtnLoadMore(false);
                            setInfoMsg('No clubs found for these filters, please try again with different filters');
                        }
                    } else {
                        setIsFound(true);
                        if(currentPage === 0){
                            setClubs(data.data);
                        } else {
                            setClubs(prevClubs => [...prevClubs, ...data.data]);
                        }if(data.data.length === CLUBS_BY_PAGE){
                            setBtnLoadMore(true);
                        }
                        else {
                            setBtnLoadMore(false);
                            setEndPage(false);
                        }
                    }
                } catch(err) {
                    setIsError(true);
                    setInfoMsg('An error occurred while loading clubs, please retry');
                }
                setIsLoading(false);
            }, 1000)
            return () => clearTimeout(timeoutId);
            }
        }, [clubName, competition, country, currentPage])

    const handleFilterChange = ({value, type}) => {
        setEndPage(false);
        setCurrentPage(0);
        setReset(false);
        if(type === NAME){
            setClubName(value);
            return;
        }
        if(type === COMPETITION){
            setCompetition(value);
            setCountry('');
            setDisableCountry(true);
            return;
        }
        if(type === COUNTRY){
            setCountry(value);
            return;
        }
    }

    const loadMore = () => {
        setBtnLoadMore(false);
        setCurrentPage(prevPage => prevPage + 1);
    }

    const resetFilters = () => {
        setClubName('');
        setCompetition('');
        setCountry('');
        setEndPage(false);
        setIsFound(true);
        setIsError(false);
        setCurrentPage(0);
        setBtnLoadMore(false);
        setReset(true);
        setDisableCountry(false)
        setClubs(JSON.parse(localStorage.getItem('default_clubs')))
        if(paramClubName){
            navigate('/clubs')
        }
    }

    return {isLoading, clubs, isError, infoMsg, clubName, competition, country, isFound, btnLoadMore, endPage, handleFilterChange, resetFilters, loadMore, reset, disableCountry }
}

export default useFetchClubs;