// this gonna be a page that holds top 8 predictions + tourney mvp prediction
// left side has 8 slots, right side is a list of all teams at the tourney
// user picks the 8 teams they think are gonna be in top 8 (champion stage)
// user may not (re)submit this once the first match of the tournament has started

import { League, Team } from "csgo-predict-api";
import TopEightPicks from "../TopEightPicks";
import TopEightList from "../TopEightList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";
import TopEightTeam from "../TopEightTeam";
import TopEightTeamBucket from "../TopEightTeamBucket";

const TopEight = ({league}: TopEightProps) => {
    let testTeams: Team[] = [{
        id: 1,
        name: "Heroic",
        logo_url: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Heroic_2023_logo.png",
        country: {
            name: "Denmark",
            code: "DN"
        },
        rank: 1,
    },
    {
        id: 2,
        name: "G2",
        logo_url: "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Esports_organization_G2_Esports_logo.svg/1200px-Esports_organization_G2_Esports_logo.svg.png",
        country: {
            name: "International",
            code: "INT"
        },
        rank: 2
    }];
    
    const topEightPicks: Team[] = new Array(8).fill(0).map(() => ({id: -1} as Team));
    // the below information will be grabbed from backend
    const topEightTeams: Team[] = testTeams;
    const [ topEightData, setTopEightData ] = useState([topEightPicks, topEightTeams]);
    const [ topEightBuckets, setTopEightBuckets ] = useState([] as JSX.Element[][]);

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

// 'Lock in Picks!' button on this page that will call setPlayoffPredictions API wrapper

type TopEightProps = {
    league: League;
}

export default TopEight;