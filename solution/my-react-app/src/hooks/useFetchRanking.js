import axios from "axios";
import { useEffect, useState } from "react";

const useFetchRanking = (competition_id, year) => {

    const [ranking, setRanking] = useState([])
    const [infoMsg, setInfoMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    console.log('Fetching ranking for this competition: ' + competition_id + ' and year: ' + year)
    useEffect(() => {

        (async()=>{
            setIsLoading(true)
            setIsError(false)

            try{

                const data = await axios.get(`http://localhost:3000/competitions/main/get_ranking`, {
                    params: {
                        selectedCompetition: competition_id,
                        selectedYear: year
                    }    
                })
                setRanking(data.data)
                console.log(data)

            } catch (err) {
                setIsError(true)
                setInfoMsg('An error occurred while loading ranking, please retry')
            }
            
            setIsLoading(false)
        })()
    }, [year])

    return {isLoading, isError, ranking, infoMsg}
}

export default useFetchRanking;