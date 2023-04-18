type ScoreProps = {
	day: number;
	userScore: number;
	totalScore: number;
	userDayScore: number;
	totalDayScore: number;
};

// get userScore, totalScore, userDayScore, totalDayScore in here eventually?
const Score = ({ day, userScore, totalScore, userDayScore, totalDayScore }: ScoreProps) => {
	const dayScoreString = !isNaN(userDayScore) ? `${userDayScore} out of ${totalDayScore}` : "No Vote";

	return (
		<div className="score-container">
			<div className="score day">{`Score for Day ${day}: ${dayScoreString}`}</div>
			<div className="score">{`Score for whole event: ${userScore} out of ${totalScore}`}</div>
		</div>
	);
};

export default Score;
