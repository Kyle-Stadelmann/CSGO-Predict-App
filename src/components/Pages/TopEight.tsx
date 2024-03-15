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
import { Button } from "@mui/material";

const TopEight = ({league}: TopEightProps) => {
    const [ topEightData, setTopEightData ] = useState([[] as Team[], [] as Team[]]);
    const [ topEightBuckets, setTopEightBuckets ] = useState([] as JSX.Element[][]);

    async function initTeams() {
        const userId = getStoredUser()?.id;
        if (!userId) return;

        let playoffPreds: PlayoffPredictions | undefined;
        try {
            playoffPreds = await getPlayoffPreds(userId, league.id);
        } catch (e) {
            // no point in logging that user has no predictions imo
        }

        try {
            // TODO: add a.rank, b.rank existence checks
            const teams = (await getLeagueTeams(league.id)).sort((a, b) => a.rank! - b.rank!);
            const pickedTeams = teams.filter((team: Team) => {
                return playoffPreds ? playoffPreds.teamIds.includes(team.id) : false;
            });

            const nonPickedTeams = replacePickedTeams(teams, pickedTeams);
            padPickedTeams(pickedTeams);

            const data = [[...pickedTeams], [...nonPickedTeams]];
            setTopEightData(data);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        initTeams();
    }, []);
    
    const constructBuckets = (data: Team[][]): JSX.Element[][] => {
        const topEightPicksBuckets = data[0].map((team: Team, index) => {
            return (
                <TopEightTeamPicksBucket
                    key={index}
                    x={0}
                    y={index}
                    team={<TopEightTeam teamInfo={team} />}
                    teamInfo={team}
                    moveTeam={moveTeam}
                />
            )
        });
        const topEightListBuckets = data[1].map((team: Team, index) => {
            return (
                <TopEightTeamListBucket
                    key={index}
                    x={1}
                    y={index}
                    team={<TopEightTeam teamInfo={team} />}
                    teamInfo={team}
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

    function replacePickedTeams(teams: Team[], pickedTeams: Team[]) {
        return teams.map((team: Team) => {
            if (pickedTeams.includes(team)) {
                const dummyTeam: Team = {
                    id: -1,
                    name: "Dummy Team",
                    country: {name: "Dummiya", code: "DY"},
                    rank: -1
                };
                return dummyTeam;
            } else {
                return team;
            }
        });
    }

    function padPickedTeams(pickedTeams: Team[]) {
        for (let i = pickedTeams.length; i < 8; i++) {
            const dummyTeam: Team = {
                id: -1,
                name: "Dummy Team",
                country: {name: "Dummiya", code: "DY"},
                rank: -1
            };
            pickedTeams.push(dummyTeam);
        }
    }

    async function submitPlayoffPredictions(predictedTeams: Team[]) {
        const noDummyPreds = predictedTeams.filter((team) => team.id !== -1);
        const playoffPreds: PlayoffPredictions = {
            userId: getStoredUser()!.id,
            leagueId: league.id,
            teamIds: noDummyPreds.map((team) => team.id),
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
            <div className="top-eight-submit-button">
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => submitPlayoffPredictions(topEightData[0])}
                >
                    Submit Predictions!
                </Button>
            </div>
		</div>
	);
};

type TopEightProps = {
    league: League;
}

export default TopEight;