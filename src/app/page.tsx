import { redirect } from "next/navigation"
import { Users, BarChart3, Award } from "lucide-react"

export default function Home() {
  // Mock authentication check - replace with your auth logic
  const isAuthenticated = true

  if (isAuthenticated) {
    redirect("/dashboard")
  }

  // Landing page for non-authenticated users
  return (
    <div className="flex flex-col gap-8">
      {/* Hero section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Predict CS2 Matches. Compete with Friends.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Join leagues, predict match outcomes, and climb the leaderboards in the ultimate Counter-Strike 2
                  prediction platform.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <a
                  href="/login"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Sign In
                </a>
                <a
                  href="/register"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Create Account
                </a>
              </div>
            </div>
            <div className="mx-auto flex w-full max-w-[400px] flex-col justify-center lg:max-w-none">
              <div className="aspect-video overflow-hidden rounded-xl bg-muted/50">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="CS2 Tournament"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="container px-4 md:px-6 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Join Leagues</h3>
              <p className="text-sm text-muted-foreground">
                Create or join leagues with friends to compete in tournaments
              </p>
            </div>
            <div className="p-6 pt-0">
              <p className="text-sm text-muted-foreground">
                Each league is tied to a specific tournament. Compete with friends to see who can predict the most
                matches correctly.
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Make Predictions</h3>
              <p className="text-sm text-muted-foreground">
                Predict match outcomes and earn points for correct predictions
              </p>
            </div>
            <div className="p-6 pt-0">
              <p className="text-sm text-muted-foreground">
                Predict which team will win each match. The more accurate your predictions, the more points you'll earn.
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Track Progress</h3>
              <p className="text-sm text-muted-foreground">View leaderboards and track your prediction accuracy</p>
            </div>
            <div className="p-6 pt-0">
              <p className="text-sm text-muted-foreground">
                See how you stack up against other predictors in your league with detailed statistics and leaderboards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to start predicting?
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Join thousands of CS2 fans making predictions and competing with friends.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <a
                href="/register"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Create Free Account
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

