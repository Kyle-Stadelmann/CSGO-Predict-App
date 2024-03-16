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

const TopEight = ({ league }: TopEightProps) => {
	const [topEightData, setTopEightData] = useState([[], []] as (Team | undefined)[][]);
	const [topEightBuckets, setTopEightBuckets] = useState([] as JSX.Element[][]);
	const [originalTeamList, setOriginalTeamList] = useState([] as Team[]);
	// i tried doing this with symbols but idk how symbols work. seemed cool tho
	const [dropTypes, setDropTypes] = useState([] as string[]);

	// i need this to only run once but it is running a lot more than once.
	useEffect(() => {
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
				setOriginalTeamList(teams);
				setDropTypes(teams.map((team) => team.id.toString()));

				const pickedTeams = teams.filter((team: Team) => {
					return !!playoffPreds ? playoffPreds.teamIds.includes(team.id) : false;
				});
				const nonPickedTeams = replacePickedTeams(teams, pickedTeams);
				padPickedTeams(pickedTeams);

				const data = [[...pickedTeams], [...nonPickedTeams]];
				setTopEightData(data);
			} catch (e) {
				console.error(e);
			}
		}

		initTeams();
	}, [league.id]);

	// there might be a way to only re-render changed buckets, idk enough React to know how to do that though
	useEffect(() => {
		const constructBuckets = (data: (Team | undefined)[][]): JSX.Element[][] => {
			const topEightPicksBuckets = data[0].map((team: Team | undefined, index) => {
				return (
					<TopEightTeamPicksBucket
						key={index}
						x={0}
						y={index}
						team={!!team ? <TopEightTeam teamInfo={team} /> : undefined}
						moveTeam={moveTeam}
						dropTypes={dropTypes}
					/>
				);
			});

			const topEightListBuckets = data[1].map((team: Team | undefined, index) => {
				const bucketInfo = !!team ? team : originalTeamList[index];
				return (
					<TopEightTeamListBucket
						key={index}
						x={1}
						y={index}
						team={!!team ? <TopEightTeam teamInfo={team} /> : undefined}
						bucketInfo={bucketInfo}
						moveTeam={moveTeam}
					/>
				);
			});

			return [topEightPicksBuckets, topEightListBuckets];
		};

		const moveTeam = (x: number, y: number, id: number) => {
			const tempData = topEightData.slice();

			// current x, y pos of team with team.id === id
			const xI = topEightData.findIndex((x: (Team | undefined)[]) => {
				return x.find((team: Team | undefined) => (!!team ? team.id === id : false)) ? true : false;
			});
			const yI = topEightData[xI].findIndex((team: Team | undefined) => {
				return !!team ? team.id === id : false;
			});

			// move data
			const tempTeamData = tempData[xI][yI];
			tempData[xI][yI] = tempData[x][y];
			tempData[x][y] = tempTeamData;
			setTopEightData(tempData);
		};

		setTopEightBuckets(constructBuckets(topEightData));
	}, [dropTypes, originalTeamList, topEightData]);

	function replacePickedTeams(listTeams: (Team | undefined)[], pickedTeams: (Team | undefined)[]) {
		return listTeams.map((team: Team | undefined) => {
			if (pickedTeams.includes(team)) return undefined;
			else return team;
		});
	}

	function padPickedTeams(pickedTeams: (Team | undefined)[]) {
		for (let i = pickedTeams.length; i < 8; i++) {
			pickedTeams.push(undefined);
		}
	}

	async function submitPlayoffPredictions(predictedTeams: (Team | undefined)[]) {
		const noEmptyPreds = predictedTeams.filter((team) => !!team) as Team[];
		const playoffPreds: PlayoffPredictions = {
			userId: getStoredUser()!.id,
			leagueId: league.id,
			teamIds: noEmptyPreds.map((team) => team.id),
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
				<Button variant="contained" color="success" onClick={() => submitPlayoffPredictions(topEightData[0])}>
					Submit Predictions!
				</Button>
			</div>
		</div>
	);
};

type TopEightProps = {
	league: League;
};

export default TopEight;
