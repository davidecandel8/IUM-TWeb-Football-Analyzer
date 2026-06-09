import axios from "axios";
import { useState, useEffect } from "react";

export const NAME = 1;
export const TEAM = 2;
export const POSITION = 3;
export const PLAYERS_BY_PAGE = 15;

const useFetchPlayers = () => {

    const [players, setPlayers] = useState([])

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isFound, setIsFound] = useState(true);
    const [endPage, setEndPage] = useState(false);
    const [reset, setReset] = useState(true);

    const [currentPage, setCurrentPage] = useState(0);
    const [showBtnLoadMore, setShowBtnLoadMore] = useState(false);

    const [infoMsg, setInfoMsg] = useState('');

    const [playerName, setPlayerName] = useState('');
    const [teamName, setTeamName] = useState('');
    const [position, setPosition] = useState('');

    useEffect(() => {

        if(localStorage.getItem('default_players')){
            setPlayers(JSON.parse(localStorage.getItem('default_players')))
            setIsLoading(false);
        } else {
        (async()=>{
            setIsError(false);
            setIsLoading(true);
            try{
                const data = await axios.get('http://localhost:3000/players/main/get_default_players')
                setPlayers(data.data);
                console.log(data);
                localStorage.setItem('default_players', JSON.stringify(data.data));
            } catch(err) {
                setIsError(true);
                setInfoMsg('An error occurred while loading players, please retry');
            }
            setIsLoading(false);

        })()}
    }, [])

    useEffect(() => {

        if(playerName || teamName || position){
          const timeoutId = setTimeout(async () => {
            setIsError(false);
            setIsLoading(true)
            setIsFound(false);
            try{
              const data = await axios.get(`http://localhost:3000/players/main/get_filtered_players`,
                {
                  params: {
                    playerName,
                    teamName,
                    position,
                    limit: PLAYERS_BY_PAGE,
                    offset: currentPage
                  }
                })
              if(data.data.length === 0){ // non sono stati trovati giocatori con quei filtri
               
                if(currentPage > 0){
                  console.log('niente più giocatori sono nel if vero')
                  setShowBtnLoadMore(false);
                  setEndPage(true);
                  setIsFound(true);
                } else {
                  setPlayers([]);
                  setIsFound(false);
                  setInfoMsg('No players found for these filters, please try again with different filters');
                  setShowBtnLoadMore(false);
                }
  
              } else { // sono stati trovati giocatori con quei filtri
                console.log('ho trovato: ' + JSON.stringify(players))
                setIsFound(true);
                if(currentPage === 0){ // se è la prima pagina va bene così
                  setPlayers(data.data);
                } else { // altrimenti devo aggiungere i nuovi giocatori a quelli già presenti
                  setPlayers(prevPlayers => [...prevPlayers, ...data.data]);
                }
                if (data.data.length === PLAYERS_BY_PAGE) {
                  setShowBtnLoadMore(true);
                }
                else {
                    setShowBtnLoadMore(false);
                    setEndPage(false);
                }
              }
            } catch(err) {
              setIsError(true);
              setInfoMsg('An error occurred while loading players, please retry');
            }
            setIsLoading(false);
          }, 1000); // Delay of 1 second
          
          // Cleanup function to clear the timeout if the component unmounts
          return () => clearTimeout(timeoutId);
        }
      }, [playerName, teamName, position, currentPage])

      const handleFilterChange = ({value, type}) => {
        setReset(false);
        setEndPage(false);
        setCurrentPage(0);
        if(type === NAME){
            setPlayerName(value);
            return;
        }
        if(type === TEAM){
            setTeamName(value);
            return;
        }
        if(type === POSITION){
            setPosition(value);
            return;
        }
    }

    const loadMore = () => {
        setShowBtnLoadMore(false);
        setCurrentPage(prevPage => prevPage + 1);
    }

    const resetFilters = () => {
        setPlayerName('');
        setTeamName('');
        setPosition('');
        setIsFound(true);
        setIsError(false);
        setInfoMsg('');
        setCurrentPage(0);
        setEndPage(false);
        setShowBtnLoadMore(false);
        setReset(true);
        setPlayers(JSON.parse(localStorage.getItem('default_players')));
    }

    return {isLoading, players, isError, infoMsg, playerName, teamName, position, handleFilterChange, resetFilters, isFound, loadMore, showBtnLoadMore, endPage, reset, setReset}
}

export default useFetchPlayers;