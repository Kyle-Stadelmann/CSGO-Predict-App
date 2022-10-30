import { getCurrentDayMatches, Match as ApiMatch } from 'csgo-predict-api';
import { useEffect, useState } from 'react';
import { DEFAULT_LEAGUE_ID } from '../constant';
import Match from './Match';
import { Picks } from './Pages/Voting';

const Matches = ({ matches, setMatches, picks, setPicks }: MatchesProps) => {
    const [ apiMatches, setApiMatches ] = useState([] as ApiMatch[])

    useEffect(() => {
        fetchMatches();
    }, []);

    useEffect(() => {
        setMatches(apiMatches);
    }, [setMatches, apiMatches]);

    async function fetchMatches() {
        try {
            // const apiMatches = await getCurrentDayMatches(DEFAULT_LEAGUE_ID);
            setApiMatches(await getCurrentDayMatches(DEFAULT_LEAGUE_ID));
        } catch (e) {
            console.log(e);
        }
    }

    function createMatches(): JSX.Element {
        return (
            <div className="matches">
                {/* seems like this line throws a warning, duplicate keys? */}
                {apiMatches.map(m => createMatch(m))}
            </div>
        );
    }

    function createMatch(apiMatch: ApiMatch): JSX.Element {
        return (
            <>
                <Match match={apiMatch} picks={picks} setPicks={setPicks} />
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

type MatchesProps = {
    matches: ApiMatch[];
    setMatches: Function;
    picks: Picks;
    setPicks: Function;
}

export default Matches;