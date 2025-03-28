"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Calendar, Home, Menu, User, LogOut, Users, Award, Trophy } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";

export function SiteHeader() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	const session = useSession().data;
	const user = session?.user;
	const isAuthenticated = !!user;

	const defaultRoute = isAuthenticated ? "/dashboard" : "/";

	const routes = [
		{
			href: defaultRoute,
			label: "Dashboard",
			icon: Home,
		},
		{
			href: "/predict",
			label: "Predictions",
			icon: BarChart3,
		},
		{
			href: "/leagues",
			label: "Leagues",
			icon: Users,
		},
		{
			href: "/leaderboard",
			label: "Leaderboard",
			icon: Award,
		},
		{
			href: "/results",
			label: "Results",
			icon: Calendar,
		},
	];

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center justify-between">
				<div className="flex items-center gap-2 md:gap-6">
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="md:hidden">
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="pr-0">
							<SheetHeader>
								<SheetTitle>
									<Link
										href={defaultRoute}
										className="flex items-center gap-2 font-bold text-xl"
										onClick={() => setIsOpen(false)}
									>
										<Trophy className="h-5 w-5" />
										CS2 Predictions
									</Link>
								</SheetTitle>
							</SheetHeader>
							<nav className="flex flex-col gap-4 mt-8">
								{routes.map((route) => (
									<Link
										key={route.href}
										href={route.href}
										onClick={() => setIsOpen(false)}
										className={cn(
											"flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-muted",
											pathname === route.href ? "bg-muted" : "transparent"
										)}
									>
										<route.icon className="h-5 w-5" />
										{route.label}
									</Link>
								))}
							</nav>
						</SheetContent>
					</Sheet>

					<Link href={defaultRoute} className="flex items-center gap-2 font-bold text-xl">
						<Trophy className="h-5 w-5" />
						<span className="hidden md:inline-block">CS2 Predictions</span>
					</Link>

					<nav className="hidden md:flex items-center gap-6">
						{routes.map((route) => (
							<Link
								key={route.href}
								href={route.href}
								className={cn(
									"flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
									pathname === route.href ? "text-primary" : "text-muted-foreground"
								)}
							>
								<route.icon className="h-4 w-4" />
								{route.label}
							</Link>
						))}
					</nav>
				</div>
				{user && (
					<div className="flex items-center gap-4">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
									<Avatar className="h-8 w-8">
										<AvatarImage src={user.picture} alt={user.name} />
										<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56" align="end" forceMount>
								<DropdownMenuLabel className="font-normal">
									<div className="flex flex-col space-y-1">
										<p className="text-sm font-medium leading-none">{user.name}</p>
										<p className="text-xs leading-none text-muted-foreground">{user.email}</p>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<User className="mr-2 h-4 w-4" />
										<span>Profile</span>
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Button variant="ghost" className="p-0 h-7" onClick={() => signOut()}>
										<LogOut className="mr-2 h-4 w-4" />
										<span className="text-left">Log out</span>
									</Button>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				)}
			</div>
		</header>
	);
}
