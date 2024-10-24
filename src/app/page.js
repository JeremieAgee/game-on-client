"use client";
import Auth from '../components/Auth';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./context/userContext";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard"); // Redirect if user is logged in
    }
  }, [user, router]); // Run effect when user changes



  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {!user ? (
          <Auth />
        ) : (
          <div>Redirecting to dashboard...</div> // Optional loading message
        )}
      </main>
    </div>
  );
}