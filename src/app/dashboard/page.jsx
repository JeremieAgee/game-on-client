"use client";
import { useUser } from "../context/userContext";
import { useRouter } from "next/navigation";
import Logout from "../components/Logout";
import TournamentComponent from "../components/TournamentComponent";
import PlatformComponent from "../components/PlatformComponent";
import GenreComponent from "../components/GenreComponent";
import GameComponent from "../components/GameComponent";
import { useState, useEffect } from "react";
import User from "../components/user";
import { useSite } from "../context/apiContext";

export default function Dashboard() {
    const { user, setUser } = useUser();
    const { games, platforms, genres, loading, tournaments, error } = useSite(); // Assuming `tournaments` comes from `useSite`
    const router = useRouter();

    // State for managing tournaments
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedGame, setSelectedGame] = useState(null); // Track selected game
    const [showPlatforms, setShowPlatforms] = useState(false);
    const [showGenres, setShowGenres] = useState(false);
    const [showGames, setShowGames] = useState(false);
    const [currentGames, setCurrentGames] = useState([]);
    const [platformGames, setPlatformGames] = useState([]);

    // Updated `findGamesByPlatform` to return correct results
    const findGamesByPlatform = (platformId) => {
        const currentPlatform = platforms.find((platform) => platform.id === platformId);
        if (!currentPlatform) return [];
        const foundGames = currentPlatform?.games.map((gameId) => {
            return games.find((game) => game.id === gameId);
        });
        return foundGames.filter((game) => game); // Filter out undefined games
    };

    // Handle log out
    const handleLogOut = () => {
        setUser(null);
        router.push("/");
    };

    // Use useEffect to update platformGames correctly after platform selection
    useEffect(() => {
        if (selectedPlatform) {
            const gamesForPlatform = findGamesByPlatform(selectedPlatform.id);
            setPlatformGames(gamesForPlatform);
            setCurrentGames(gamesForPlatform); // Update current games to reflect selected platform
        }
    }, [selectedPlatform]);

    return (
        <div className="flex min-h-screen bg-gray-900 text-gray-100">
            {/* Sidebar for User Profile */}
            <div className="w-1/4 p-4 bg-gray-800 border-r border-gray-700">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold mb-4">Welcome, {user?.user_metadata?.name}</h1>
                        {user ? (
                            <>
                                <User
                                    initialPreferredGames={user?.user_metadata?.preferredGames}
                                    initialPreferredPlatform={user?.user_metadata?.preferredPlatform}
                                    findGamesByPlatform={findGamesByPlatform}
                                />
                                <Logout handleLogOut={handleLogOut} />
                            </>
                        ) : (
                            <div>
                                <p>Sorry, you must be logged in to access this page. Thank you.</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Main Dashboard Content */}
            <div className="flex-1 p-4">
                {user && (
                    <>
                        <div className="p-8">
                            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

                            {/* Dropdown for Platforms */}
                            <div className="mb-4">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                    onClick={() => setShowPlatforms(!showPlatforms)}
                                    aria-haspopup="true"
                                    aria-expanded={showPlatforms}
                                >
                                    {selectedPlatform ? selectedPlatform.name : "Select a Platform"}
                                </button>
                                {showPlatforms && (
                                    <div className="mt-2 border border-gray-200 rounded-lg shadow-lg">
                                        {platforms.map((platform) => (
                                            <PlatformComponent
                                                findGamesByPlatform={findGamesByPlatform}
                                                key={platform.id}
                                                platform={platform}
                                                onSelect={() => {
                                                    setSelectedPlatform(platform);
                                                    setCurrentGames(platformGames)
                                                    setShowPlatforms(false);
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Dropdown for Genres */}
                            <div className="mb-4">
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                                    onClick={() => setShowGenres(!showGenres)}
                                    aria-haspopup="true"
                                    aria-expanded={showGenres}
                                >
                                    {selectedGenre ? selectedGenre.name : "Select a Genre"}
                                </button>
                                {showGenres && (
                                    <div className="mt-2 border border-gray-200 rounded-lg shadow-lg">
                                        {genres.map((genre) => (
                                            <GenreComponent
                                                key={genre.id}
                                                genre={genre}
                                                onSelect={() => {
                                                    setSelectedGenre(genre);
                                                    setCurrentGames(platformGames.filter((game) => game.genreId === genre.id));
                                                    setShowGenres(false);
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Dropdown for Games */}
                            <div className="mb-4">
                                <button
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                                    onClick={() => setShowGames(!showGames)}
                                    aria-haspopup="true"
                                    aria-expanded={showGames}
                                >
                                    {selectedGame ? selectedGame.name : "Select a Game"}
                                </button>
                                {showGames && (
                                    <div className="mt-2 border border-gray-200 rounded-lg shadow-lg">
                                        {currentGames.map((game) => (
                                            <GameComponent
                                                key={game.id}
                                                game={game}
                                                onSelect={() => {
                                                    setSelectedGame(game);
                                                    setShowGames(false);
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tournament Management */}
                        <h2 className="text-2xl font-bold mb-4">Available Tournaments</h2>

                        {/* TournamentComponent should go here */}
                    </>
                )}

                {!user && handleLogOut()}
            </div>
        </div>
    );
}