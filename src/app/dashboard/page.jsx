"use client";
import { useUser } from "../context/userContext"; // Ensure this path is correct
import { useRouter } from "next/navigation";
import Logout from "../components/Logout"; // Ensure this path is correct
import DashboardComponent from "../components/DashboardComponent";

export default function Dashboard() {
    const { user, setUser } = useUser(); // Ensure useUser works as expected
    const router = useRouter();
    const handleLogOut = ()=>{
        setUser(null);
        router.push("/");
    }
    // Wrap the Dashboard component with APIProvider
    return (
        <div>
            <DashboardComponent user={user} setUser={setUser} router={router} />
            <Logout handleLogOut={handleLogOut}/>
        </div>
    );
}