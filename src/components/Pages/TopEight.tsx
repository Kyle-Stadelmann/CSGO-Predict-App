// this gonna be a page that holds top 8 predictions + tourney mvp prediction
// left side has 8 slots, right side is a list of all teams at the tourney
// user picks the 8 teams they think are gonna be in top 8 (champion stage)
// user may not (re)submit this once the first match of the tournament has started

import TopEightPicks from "../TopEightPicks";
import TopEightList from "../TopEightList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";
import TopEightTeam from "../TopEightTeam";
import TopEightTeamPicksBucket from "../TopEightPicksBucket";
import TopEightTeamListBucket from "../TopEightListBucket";
import {
    League,
    Team,
    PlayoffPredictions,
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
            const playoffPreds = await getPlayoffPreds(+userId, league.id);
            const teams = (await getLeagueTeams(league.id)).sort((a, b) => a.rank! - b.rank!);

            const pickedTeams = teams.filter((team: Team) => {
                return playoffPreds.teamIds.includes(team.id);
            })

            // keep pickedTeams at length 8 for 8 buckets
            for (let i = 7-pickedTeams.length; i < 8; i++) {
                // this needs to push empty Team or smth?
                //pickedTeams.push()
            }

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
        // there will likely be an issue to be resolved generating this with empties at the end
        // since the last will be empties, we need to be able to initialize buckets without a TopEightTeam
        const topEightPicksBuckets = data[0].map((team: Team, index) => {
            return (
                <TopEightTeamPicksBucket
                    x={0}
                    y={index}
                    team={<TopEightTeam teamInfo={team} />}
                    teamInfo={team}
                    moveTeam={moveTeam}
                />
            )
        });
        // i want this to put empty buckets with team info if the team is in picks
        // and i want the empty buckets to render faded team info with no drag
        // but the current structure of the buckets doesn't allow for that
        const topEightListBuckets = data[1].map((team: Team, index) => {
            return (
                <TopEightTeamListBucket
                    x={1}
                    y={index}
                    team={<TopEightTeam teamInfo={team} />}
                    teamInfo = {team}
                    moveTeam={moveTeam}
                />
            )
        });

        return [topEightPicksBuckets, topEightListBuckets];
    }
    
    // there might be a way to only re-render changed buckets, idk enough React to know how to do that though
    useEffect (() => {
        setTopEightBuckets(constructBuckets(topEightData));
    }, [topEightData]);

    // TODO: 'Lock in Picks!' button on this page that will call setPlayoffPredictions API wrapper
    async function submitPlayoffPredictions(predictedTeams: Team[]) {
        const playoffPreds: PlayoffPredictions = {
            userId: getStoredUser()!.id,
            leagueId: league.id,
            teamIds: predictedTeams.map((team) => team.id),
            date: new Date(),
        };
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