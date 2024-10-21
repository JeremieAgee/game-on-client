"use client";
import { useUser } from "../context/userContext";
import { useRouter } from "next/navigation";
import Logout from "../components/Logout";
import DashboardComponent from "../components/DashboardComponent";
import TournamentComponent from "../components/TournamentComponent";
import JoinComponent from "../components/JoinComponent";
import { useState } from "react";
import User from "../components/user";
import { useSite } from "../context/apiContext";

export default function Dashboard() {
    const { user, setUser } = useUser();
    const { games, platforms, genre, loading, tournaments, error } = useSite(); // Assuming `tournaments` comes from `useSite`
    const router = useRouter();
    // State for managing tournaments
    const [tournament, setTournament] = useState(null);

    const findGamesByPlatform = (platformId) => {
        const currentPlatform = platforms.find((platform) => platform.id === platformId);
        const findGames = currentPlatform?.games; // Add safe navigation to avoid errors
        return findGames;
    };

    // Handle log out
    const handleLogOut = () => {
        setUser(null);
        router.push("/");
    };

    return (
        <div className="flex min-h-screen bg-gray-900 text-gray-100">
            {/* Sidebar for User Profile */}
            <div className="w-1/4 p-4 bg-gray-800 border-r border-gray-700">
                <h1 className="text-2xl font-bold mb-4">Welcome, {user?.user_metadata?.name}</h1>
                {user ? (
                    <>
                        <User
                            initialPreferredGames={user?.user_metadata?.preferredGames}
                            initialPreferredPlatform={user?.user_metadata?.preferredPlatform}
                        />
                        <Logout handleLogOut={handleLogOut} />
                    </>
                ) : (
                    <div>
                        <p>Sorry, you must be logged in to access this page. Thank you.</p>
                    </div>
                )}
            </div>

            {/* Main Dashboard Content */}
            <div className="flex-1 p-4">
                {user && (
                    <>
                        {/* Dashboard content */}
                        <DashboardComponent user={user} setUser={setUser} router={router} />

                        {/* Tournament Management */}
                        <h2 className="text-2xl font-bold mt-6">Tournament Management</h2>

                        {/* Join Tournament component */}
                        {tournament && (
                            <JoinComponent tournament={tournament} setTournament={setTournament} />
                        )}

                        <h2 className="text-2xl font-bold mb-4">Available Tournaments</h2>
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p className="text-red-500">{error.message}</p>
                        ) : tournaments.length === 0 ? (
                            <p>No tournaments available.</p>
                        ) : (
                            <ul>
                                {tournaments.map(tournament => (
                                    <TournamentComponent key={tournament.id} tournament={tournament} />
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}