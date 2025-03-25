import "@/app/globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "CS2 Predictions",
	description: "Predict Counter-Strike 2 match outcomes and compete with friends",
	generator: "v0.dev",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
	const session = await auth();

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<AuthProvider session={session}>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
						<div className="relative min-h-screen flex flex-col">
							<SiteHeader />
							<main className="flex-1">{children}</main>
							<SiteFooter />
						</div>
						<Toaster />
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	);
}

import "./globals.css";
import AuthProvider from "@/components/auth-provider";
import { auth } from "@/lib/auth";
