import { getCurrentDayMatches, Match as ApiMatch } from 'csgo-predict-api';
import { useEffect, useState } from 'react';
import { DEFAULT_LEAGUE_ID } from '../constant';
import Match from './Match';

const Matches = () => {
    const [ apiMatches, setApiMatches ] = useState([] as ApiMatch[])

    useEffect(() => {
        fetchMatches();
      }, []);

    async function fetchMatches() {
        try {
            const apiMatches = await getCurrentDayMatches(DEFAULT_LEAGUE_ID);
            setApiMatches(apiMatches);
        } catch (e) {
            console.log(e);
        }
    }

    function createMatches(): JSX.Element {
        return (
            <div className="matches">
                {apiMatches.map(m => createMatch(m))}
            </div>
        );
    }

    function createMatch(apiMatch: ApiMatch): JSX.Element {
        return (
            <>
                <Match match={apiMatch}></Match>
                <br></br>
            </>
        );
    }

    return (
        <div className="match-window">
            {createMatches()}
        </div>
    );
}

export default Matches;