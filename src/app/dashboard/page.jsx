"use client";
import { useUser } from "../context/userContext"; // Ensure this path is correct
import { useRouter } from "next/navigation";
import Logout from "../components/Logout"; // Ensure this path is correct
import DashboardComponent from "../components/DashboardComponent";
import TournamentComponent from "../components/TournamentComponent"; // Ensure this path is correct
import JoinComponent from "../components/JoinComponent"; // Ensure this path is correct
import { useState } from "react";

export default function Dashboard() {
    const { user, setUser } = useUser(); // Ensure useUser works as expected
    const router = useRouter();

    // State for managing tournaments
    const [tournament, setTournament] = useState(null);

    // Handle log out
    const handleLogOut = () => {
        setUser(null);
        router.push("/");
    };

    // Render the dashboard
    return (
        <div>
            <h1>Welcome, {user?.name}</h1>
            
            {/* Dashboard content */}
            <DashboardComponent user={user} setUser={setUser} router={router} />

            {/* Tournament Management */}
            <h2>Tournament Management</h2>
            {/* Tournament component for add, update, delete */}
            
            {/* Join Tournament component */}
            {tournament && (
                <JoinComponent tournament={tournament} setTournament={setTournament} />
            )}

            {/* Log out button */}
            <Logout handleLogOut={handleLogOut} />
        </div>
    );
}