"use client";
import Auth from "@/app/components/auth";
import { useRouter } from "next/navigation";
import { supabase } from "./axios/supabase";
import { useUser } from "./context/userContext";
export default function Home() {
  const {user, setUser} = useUser()
  const router = useRouter();
  const handleLogIn = (currentUser) =>{
    setUser(currentUser);
    router.push("/dashboard");
  }
  const handleSignUp = (currentUser) =>{
    setUser(currentUser);
    router.push("/dashboard");
  }
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (!error) alert('Logged out successfully');
    setUser(null);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {!user ? (
          <Auth handleLogIn={handleLogIn} handleSignUp={handleSignUp}/>
        ) : (
          <div></div>
        )}
      </main>
    </div>
  );
}