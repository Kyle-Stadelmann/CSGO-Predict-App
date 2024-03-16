import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function DaySelect(props: DaySelectProps) {
	const { day, setDay, days, maxDay } = props;

	const handleChange = (event: SelectChangeEvent<number>) => {
		const currentDay = event.target.value as number;
		setDay(currentDay);
	};

	return (
		<div>
			<FormControl sx={{ minWidth: 140 }}>
				<Select
					id="leaderboard-day-select"
					className="leaderboard-day-select"
					value={day}
					onChange={handleChange}
				>
					{days.map((day) => (
						<MenuItem value={day}>{day === maxDay ? "Current day" : `Day ${day}`}</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}

type DaySelectProps = {
	day: number;
	setDay: React.Dispatch<React.SetStateAction<number>>;
	days: number[];
	maxDay: number;
};
