import { supabase } from "../axios/supabase"; // Ensure the path is correct

export default function Logout({handleLogOut}) {
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) alert('Logged out successfully');
        handleLogOut();
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
            >
                Logout
            </button>
        </div>
    );
}