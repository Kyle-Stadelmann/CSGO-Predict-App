// this gonna be a page that holds top 8 predictions + tourney mvp prediction
// left side has 8 slots, right side is a list of all teams at the tourney
// user picks the 8 teams they think are gonna be in top 8 (champion stage)
// user may not (re)submit this once the first match of the tournament has started

import { Id, League, Team } from "csgo-predict-api";
import TopEightPicks from "../TopEightPicks";
import TopEightList from "../TopEightList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";
import TopEightTeam from "../TopEightTeam";
import TopEightTeamBucket from "../TopEightTeamBucket";
import {
    getLeagueTeams,
    getPlayoffPredictions as getPlayoffPreds,
    submitPlayoffPredictions as submitPlayoffPreds,
} from "csgo-predict-api";
import { getStoredUser } from "../../lib/user-util";

const TopEight = ({league}: TopEightProps) => {
    const [ topEightData, setTopEightData ] = useState([[] as Team[], [] as Team[]]);
    const [ topEightBuckets, setTopEightBuckets ] = useState([] as JSX.Element[][]);

    async function initTeams() {
        try {
            const userId = getStoredUser()?.id;
            if (!userId) return;
            const playoffPreds = getPlayoffPreds(userId, league.id);
            const teams = getLeagueTeams(league.id);

            const pickedTeams = teams.filter((team: Team) => {
                return playoffPreds.teamIds.includes(team.id);
            });

            const data = [[...pickedTeams], [...teams]];
            setTopEightData(data);
        } catch (e) {
            console.error(e);
        }
    }

    // this might call initTeams() every time a team is moved?
    useEffect(() => {
        initTeams();
    }, []);

    const moveTeam = (x: number, y: number, id: number) => {
        const tempData = topEightData.slice();

        // current x, y pos of team with team.id === id
        const xI = topEightData.findIndex((x: Team[]) => {
            return x.find((team: Team) => team.id === id) ? true : false;
        });
        const yI = topEightData[xI].findIndex((team: Team) => {
            return team.id === id;
        });

        // move data
        const tempTeamData = tempData[x][y];
        tempData[x][y] = tempData[xI][yI];
        tempData[xI][yI] = tempTeamData;
        setTopEightData(tempData);
    }

    const constructBuckets = (data: Team[][]): JSX.Element[][] => {
        const topEightPicksBuckets: JSX.Element[] = [];
        const topEightListBuckets: JSX.Element[] = [];

        data[0].forEach((team: Team, index) => {
            topEightPicksBuckets.push(<TopEightTeamBucket x={0} y={index} team={<TopEightTeam teamInfo={team} />} moveTeam={moveTeam} />)
        });
        data[1].forEach((team: Team, index) => {
            topEightListBuckets.push(<TopEightTeamBucket x={1} y={index} team={<TopEightTeam teamInfo={team} />} moveTeam={moveTeam} />)
        });

        return [topEightPicksBuckets, topEightListBuckets];
    }
    
    useEffect (() => {
        setTopEightBuckets(constructBuckets(topEightData));
    }, [topEightData]);

    // TODO: 'Lock in Picks!' button on this page that will call setPlayoffPredictions API wrapper
    async function submitPlayoffPredictions(teams: Team[]) {
        const playoffPreds = topEightData[0];
        try {
            await submitPlayoffPreds(playoffPreds);
        } catch (e) {
            console.error(e);
        }
    }

	return (
		<div className="top-eight-page">
			this is the top eight page for the league with Tournament ID {`${league.tournamentId}`}
            <br />
            <div className="top-eight">
                <DndProvider backend={HTML5Backend}>
                    <TopEightPicks teams={topEightBuckets[0]} />
                    <TopEightList teams={topEightBuckets[1]} />
                </DndProvider>
            </div>
		</div>
	);
};

type TopEightProps = {
    league: League;
}

export default TopEight;