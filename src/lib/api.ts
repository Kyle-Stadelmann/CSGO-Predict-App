import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

// For server-side requests
export async function fetchWithServerAuth(url: string, options: RequestInit = {}) {
	const session = await getServerSession(authOptions);

	if (!session?.backendToken) {
		throw new Error("No authentication token available");
	}

	const response = await fetch(url, {
		...options,
		headers: {
			...options.headers,
			Authorization: `Bearer ${session.backendToken}`,
		},
	});

	if (!response.ok) {
		throw new Error(`API request failed: ${response.statusText}`);
	}

	return response.json();
}

// Helper function to create a Next.js API route handler that forwards requests to your backend
export function createBackendHandler(backendPath: string) {
	return async (req: Request) => {
		const session = await getServerSession(authOptions);

		if (!session?.backendToken) {
			return new Response("Unauthorized", { status: 401 });
		}

		// Forward the request to your backend
		const response = await fetch(`${process.env.BACKEND_URL}${backendPath}`, {
			method: req.method,
			headers: {
				...Object.fromEntries(req.headers),
				Authorization: `Bearer ${session.backendToken}`,
			},
			body: req.body,
		});

		// Forward the response back to the client
		return new Response(response.body, {
			status: response.status,
			headers: response.headers,
		});
	};
}
