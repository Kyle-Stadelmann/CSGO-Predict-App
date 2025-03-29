import { getLeaguesForUser } from "csgo-predict-api";
import { LeagueSummary } from "csgo-predict-api";
import { SiteHeader } from "./site-header";
import { getServerAuthSession } from "@/lib/auth";

export async function SiteHeaderWrapper() {
	const session = await getServerAuthSession();

	let leagueSummaries: LeagueSummary[] = [];
	if (session?.user?.id && session?.backendToken) {
		try {
			leagueSummaries = await getLeaguesForUser(session.user.id, session.backendToken);
		} catch (e) {
			console.error("Failed to fetch leagues for user:", e);
		}
	}

	return (
		<div>
			<SiteHeader leagueSummaries={leagueSummaries} />
		</div>
	);
}
