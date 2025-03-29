import "@/app/globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteFooter } from "@/components/site-footer";
import { ReactNode } from "react";
import "./globals.css";
import AuthProvider from "@/contexts/auth-provider";
import { getServerAuthSession } from "@/lib/auth";
import { SiteHeaderWrapper } from "@/components/site-header-wrapper";
import { LeagueProvider } from "@/contexts/league-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "CS2 Predictions",
	description: "Predict Counter-Strike 2 match outcomes and compete with friends",
	generator: "v0.dev",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
	const session = await getServerAuthSession();

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<AuthProvider session={session}>
					<LeagueProvider>
						<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
							<div className="relative min-h-screen flex flex-col">
								<SiteHeaderWrapper />
								<main className="flex-1">{children}</main>
								<SiteFooter />
							</div>
							<Toaster />
						</ThemeProvider>
					</LeagueProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
