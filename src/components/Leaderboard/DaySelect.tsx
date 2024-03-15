import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function DaySelect(props: DaySelectProps) {
	const { day, setDay, days } = props;

	const handleChange = (event: SelectChangeEvent<number>) => {
		const currentDay = event.target.value as number;
		setDay(currentDay);
	};

	return (
		<div>
			<FormControl fullWidth>
				<Select
					id="leaderboard-day-select"
					className="leaderboard-day-select"
					value={day}
					onChange={handleChange}
				>
					{days.map((day) => (
						<MenuItem key={day} value={day}>
							Day {day}
						</MenuItem>
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
};
