// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";
// Extend the built-in session types
declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			name: string;
			email?: string;
			picture?: string;
		};
		// Add the backend JWT token to the session
		backendToken: string;
	}
}
