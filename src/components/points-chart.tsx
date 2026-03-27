"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Mock data for points over time
const data = [
	{ date: "Jul 1", points: 5 },
	{ date: "Jul 2", points: 0 },
	{ date: "Jul 3", points: 10 },
	{ date: "Jul 4", points: 5 },
	{ date: "Jul 5", points: 0 },
	{ date: "Jul 6", points: 15 },
	{ date: "Jul 7", points: 5 },
	{ date: "Jul 8", points: 10 },
	{ date: "Jul 9", points: 0 },
	{ date: "Jul 10", points: 10 },
];

export function PointsChart() {
	return (
		<ResponsiveContainer width="100%" height={350}>
			<LineChart data={data}>
				<XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
				<YAxis
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => `${value}`}
				/>
				<Tooltip
					content={({ active, payload }) => {
						if (active && payload && payload.length) {
							return (
								<div className="rounded-lg border bg-background p-2 shadow-sm">
									<div className="grid grid-cols-2 gap-2">
										<div className="flex flex-col">
											<span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
											<span className="font-bold text-muted-foreground">
												{payload[0].payload.date}
											</span>
										</div>
										<div className="flex flex-col">
											<span className="text-[0.70rem] uppercase text-muted-foreground">
												Points
											</span>
											<span className="font-bold">{payload[0].value}</span>
										</div>
									</div>
								</div>
							);
						}
						return null;
					}}
				/>
				<Line
					type="monotone"
					dataKey="points"
					stroke="hsl(var(--primary))"
					strokeWidth={2}
					activeDot={{
						r: 6,
						style: { fill: "hsl(var(--primary))", opacity: 0.8 },
					}}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}
