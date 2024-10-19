"use client"
import { useUser } from "../context/userContext"; // Ensure this path is correct
import { useRouter } from "next/navigation";
import Logout from "../components/logout"; // Ensure this path is correct

export default function Dashboard() {
    const { user, setUser } = useUser(); // Ensure useUser works as expected
    const router = useRouter();

    const handleLogOut = async () => {
        setUser(null); // Clear the user state
        router.push("/"); // Redirect after logout
    };

    return (
        <div>
            <h1>Dashboard</h1>
            {user && <Logout handleLogOut={handleLogOut} />} {/* Only show Logout if user is logged in */}
        </div>
    );
}