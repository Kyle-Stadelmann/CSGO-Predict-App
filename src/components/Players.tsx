import { getLeagueById, League, User } from 'csgo-predict-api';
import React, { useEffect, useState } from 'react'
import { DEFAULT_LEAGUE_ID } from '../constant';
import { USER_SESSION_STORAGE_KEY } from './Pages/lib/user-util';
import Player from './Player'

const Players = () => {
    const [ league, setLeague ] = useState({} as League);
    const [ userScores, setUserScores ] = useState({} as Map<string, number>);

	useEffect(() => {
        async function fetchPlayers() {
            try {
                const initLeague = await getLeagueById(DEFAULT_LEAGUE_ID);
                setUserScores(initLeague.userScores);
                setLeague(initLeague);
            } catch (e) {
                // To have loaded this component, the user must have already authenticated with the backend.
                // This error typically occurs when the authed session is lost in the backend for whatever reason.
                // To account for this mismatch, restart the auth process
                sessionStorage.removeItem(USER_SESSION_STORAGE_KEY);
                window.location.href = "/";
            }
        }

		fetchPlayers();
	}, []);

	function createPlayersElement(): JSX.Element {
        const scores = [] as {userId: string, score: number}[];
        try {
            userScores.forEach((score, userId) => {
                scores.push({userId, score});
            });
        } catch (e) {
            // on refresh this runs before useEffect, how to initialize?
            console.log("userScores isn't initialized yet");
        }
        scores.sort(function(user1, user2){return user1.score < user2.score ? 1 : -1});
        
		return (
			<div className="player-window">
                {scores.map((m) => createPlayerElement(m.userId, m.score))}
			</div>
		);
	}

    function createPlayerElement(player: string, score: number): JSX.Element {
		return (
			<Player player={player} score={score} league={league} />
		);
	}

	return createPlayersElement();
};

export default Players