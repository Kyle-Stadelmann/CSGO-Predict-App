import { League, LeagueDay, UserLeagueDayResults } from "csgo-predict-api";
import LeaderboardEntry from "./LeaderboardEntry";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";

// TODO: this window needs to be contained and have a scroll bar
// so it doesn't stretch past the window/has constant size
export default function LeaderboardList({ league, day }: PlayersProps) {
	const leagueDay = getLeagueDay(league);

	function getLeagueDay(league: League): LeagueDay {
		if (!league.daysMap.has(day)) throw new Error(`Couldn't retrieve league day for day=${day}`);
		return league.daysMap.get(day)!;
	}

	function createList(): JSX.Element {
		const leagueDayResults = [...leagueDay.userScores.values()]
			.sort((a, b) => a.runningDayScore - b.runningDayScore)
			.reverse();

		return (
			<Box>
				<List className="leaderboard-list" disablePadding>
					{leagueDayResults.map((ldr, idx) => createListEntry(ldr, idx + 1))}
				</List>
			</Box>
		);
	}

	function createListEntry(leagueDayResult: UserLeagueDayResults, placing: number): JSX.Element {
		const { user, dayScore, runningDayScore } = leagueDayResult;
		return (
			<ListItem disablePadding>
				<LeaderboardEntry
					key={user.id}
					user={user}
					placing={placing}
					dayScore={dayScore}
					maxDayScore={leagueDay.maxScore}
					runningScore={runningDayScore}
					maxRunningScore={leagueDay.maxRunningDayScore}
				/>
			</ListItem>
		);
	}

	return createList();
}

type PlayersProps = {
	league: League;
	day: number;
};
