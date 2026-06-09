import axios from 'axios';
import { useState, useEffect } from 'react';


const useFetchGamesDetails = (game_id) => {   

    const [gameEvents, setGameEvents] = useState([]);
    const [gameLineups, setgameLineups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [foundEvents, setFoundEvents] = useState(true);
    const [foundLineUps, setFoundLineUps] = useState(true);
    const [infoMsg, setInfoMsg] = useState('');

    useEffect(() => {
        const fetchData = async (url, setData, setFound) => {
            if(game_id){
                setLoading(true);
                setError(false);
                try {
                    const response = await axios.get(url, {
                        params: { 
                            game_id
                        } 
                    });
                    if (response.data.length  > 0) {
                        setFound(true);
                        console.log(JSON.stringify(response.data))
                        setData(response.data); 
                        console.log(response.data);
                    } else {
                        setFound(false);
                        setInfoMsg('No data found');
                    }
                } catch (error) {
                    setError(true);
                    setInfoMsg('An error occurred while loading data, please retry');
                }
                finally {
                    setLoading(false);
                }
            }
        }
    
        fetchData('http://localhost:3000/game_events/main/get_game_events', setGameEvents, setFoundEvents);
        fetchData('http://localhost:3000/game_lineups/main/get_game_lineups', setgameLineups, setFoundLineUps);
    }, []);

    return { gameEvents, gameLineups, loading, error, foundEvents, foundLineUps, infoMsg};
}

export default useFetchGamesDetails;