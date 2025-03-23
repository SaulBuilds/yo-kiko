import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { WagmiConfig } from 'wagmi';
import { config } from './lib/web3';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import GamePage from "@/pages/game-page";
import NewGamePage from "@/pages/new-game-page";
import TempleRunnerPage from "@/pages/temple-runner-page";
import { ProtectedRoute } from "./lib/protected-route";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/game/new" component={NewGamePage} />
      <ProtectedRoute path="/game/:id" component={GamePage} />
      <ProtectedRoute path="/temple-runner" component={TempleRunnerPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background">
      <WagmiConfig config={config}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Router />
            <Toaster />
          </AuthProvider>
        </QueryClientProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;