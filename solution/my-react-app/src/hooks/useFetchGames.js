import axios from 'axios';
import { useState, useEffect } from 'react';
import {competitions} from "../utils/games_data"

export const COMPETITION = 1;
export const YEAR = 2;
export const ROUND = 3;
export const GAMES_BY_PAGE = 27;

const useFetchGames = () => {

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [infoMsg, setInfoMsg] = useState('');
    const [reset, setReset] = useState(true);

    const [currentPage, setCurrentPage] = useState(0);
    const [found, setFound] = useState(true);
    const [showBtnLoadMore, setShowBtnLoadMore] = useState(false);
    const [endPage, setEndPage] = useState(false);
    const [start, setStart] = useState(true);

    const [selectedCompetition, setSelectedCompetition] = useState(null);
    const [selectedCompetitionType, setSelectedCompetitionType] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedRound, setSelectedRound] = useState(null);
    const [disableRound, setDisableRound] = useState(true);


    useEffect(() => {
        const fetchGames = async () => {
            if(selectedCompetition || selectedYear || selectedRound){
                setLoading(true);
                setStart(false);
                setError(false);
                setFound(false);
                try {
                    const response = await axios.get('http://localhost:3000/games/main/get_games', {
                        params: { 
                            selectedCompetition, 
                            selectedYear, 
                            selectedRound,
                            limit: GAMES_BY_PAGE,
                            offset: currentPage * GAMES_BY_PAGE 
                        } 
                    });
                    if (response.data.length  > 0) {
                        setFound(true);
                        if (currentPage == 0) {
                            setGames(response.data); 
                        } else {
                            setGames(prevGames => [...prevGames, ...response.data]);
                        }

                        if (response.data.length === GAMES_BY_PAGE) {
                            setShowBtnLoadMore(true);
                        }
                        else {
                            setShowBtnLoadMore(false);
                            setEndPage(false);
                        }
                    } else {
                        if (currentPage > 0) {
                            setShowBtnLoadMore(false);
                            setEndPage(true);
                            setFound(true);
                        }
                        else {
                            setGames([]);
                            setFound(false);
                            setInfoMsg('No games found for these filters');
                            setShowBtnLoadMore(false);
                        }
                    }
                } catch (error) {
                    setError(true);
                    setInfoMsg('An error occurred while loading games, please retry');
                }
                finally {
                    setLoading(false);
                }
            }   
            else {
                setGames([]);
            };
        }
        fetchGames();
    }, [selectedCompetition, selectedYear, selectedRound, currentPage]);

    const handleFilterChange = ({value, type}) => {
        setReset(false);
        setEndPage(false);
        setCurrentPage(0);
        setReset(false);
        if(type === COMPETITION){
            if(value === ''){
                resetFilters();
                return;
            }
            setSelectedCompetition(value);
            setSelectedCompetitionType(competitions.find(comp => comp.id === value)?.type || null);
            setDisableRound(false);
            return;
        }
        if(type === YEAR){
            if(value === ''){
                resetFilters();
                return;
            }
            setSelectedYear(value);
            return;
        }
        if(type === ROUND){
            if(value === ''){
                resetFilters();
                return;
            }
            setSelectedRound(value);
            return;
        }
    };

    const loadMore = () => {
        setShowBtnLoadMore(false);
        setCurrentPage(prevPage => prevPage + 1);
    };

    const resetFilters = () => {
        setSelectedCompetition(null);
        setSelectedCompetitionType(null);
        setSelectedYear(null);
        setSelectedRound(null);
        setDisableRound(true);
        setCurrentPage(0);
        setEndPage(false);
        setFound(true);
        setShowBtnLoadMore(false);
        setStart(true);
        setReset(true);
    };

    return { games, loading, error, found, infoMsg, endPage, showBtnLoadMore, start, reset, selectedCompetition, selectedCompetitionType, selectedYear, selectedRound, disableRound, handleFilterChange, resetFilters, loadMore};
};

export default useFetchGames;
