import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { authPredictionUser, AuthResponse } from "csgo-predict-api";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	pages: {
		signIn: "/auth/signin",
	},
	callbacks: {
		async signIn({ account }) {
			if (account) {
				try {
					const authResponse = await authPredictionUser(account.id_token!);
					account.backendResponse = authResponse;
					return true;
				} catch (error) {
					console.error("Backend authentication failed: ", error);
				}
			}
			return false;
		},
		async session({ session, token }) {
			const backendResponse = token.backendResponse as AuthResponse;
			session.backendToken = backendResponse.token;
			session.user = backendResponse.user;
			return session;
		},
		async jwt({ token, account }) {
			if (account) {
				token.backendResponse = account.backendResponse;
			}
			return token;
		},
	},
	jwt: {
		maxAge: 60 * 60 * 24 * 30, // 30 days
	},
};

// For use in server contexts
export const getServerAuthSession = () => getServerSession(authOptions);
