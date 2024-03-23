import { League, LeagueDay, User } from "csgo-predict-api";
import LeaderboardEntry from "./LeaderboardEntry";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";

// TODO: this window needs to be contained and have a scroll bar
// so it doesn't stretch past the window/has constant size
export default function LeaderboardList({ league, day }: PlayersProps) {
	const leagueDay = getLeagueDay(day);

	function createList(): JSX.Element {
		const leagueDayResults = [...leagueDay.userScores.values()]
			.sort((a, b) => a.runningDayScore - b.runningDayScore)
			.reverse();

		return (
			<Box>
				<List className="leaderboard-list" disablePadding>
					{leagueDayResults.map((ldr, idx) =>
						createListEntry(ldr.user, `${ldr.dayScore}`, ldr.runningDayScore, idx + 1)
					)}
				</List>
			</Box>
		);
	}

	function createCurrentDayList(): JSX.Element {
		const prevLeagueDay = getPrevLeagueDay(day);

		if (prevLeagueDay) {
			const leagueDayResults = [...prevLeagueDay.userScores.values()]
				.sort((a, b) => a.runningDayScore - b.runningDayScore)
				.reverse();

			return (
				<Box>
					<List className="leaderboard-list" disablePadding>
						{leagueDayResults.map((ldr, idx) =>
							createListEntry(ldr.user, "?", ldr.runningDayScore, idx + 1)
						)}
					</List>
				</Box>
			);
		} else {
			const listEntries: JSX.Element[] = [];
			league.userScores.forEach((totalScore, user) => {
				listEntries.push(createListEntry(user, "?", 0, 1));
			});
			return (
				<Box>
					<List className="leaderboard-list" disablePadding>
						{listEntries}
					</List>
				</Box>
			);
		}
	}

	function createListEntry(user: User, dayScore: string, runningDayScore: number, placing: number): JSX.Element {
		return (
			<ListItem key={user.id} disablePadding>
				<LeaderboardEntry
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

	function getLeagueDay(day: number): LeagueDay {
		if (!league.daysMap.has(day)) throw new Error(`Couldn't retrieve league day for day=${day}`);
		return league.daysMap.get(day)!;
	}

	function getPrevLeagueDay(day: number): LeagueDay | undefined {
		// TODO: why are days strings and not numbers ....
		const days = [...league.daysMap.keys()].sort((a, b) => +a - +b).reverse();
		return league.daysMap.size > 1 ? league.daysMap.get(days[days.findIndex((d) => day === d) + 1]) : undefined;
	}

	return leagueDay.userScores.size > 0 ? createList() : createCurrentDayList();
}

type PlayersProps = {
	league: League;
	day: number;
};
