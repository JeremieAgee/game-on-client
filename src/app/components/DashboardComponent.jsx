"use client";
import { useSite } from "../context/apiContext";
import GameComponent from "../components/GameComponent"; 
import PlatformComponent from "../components/PlatformComponent"; 
import GenreComponent from "../components/GenreComponent"; 
import { useState } from "react";
import AddTournament from "../components/AddTournament";

const DashboardComponent = () => {
    const { platforms, games, genres, tournaments, loading, error } = useSite();
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null); 
    const [showPlatforms, setShowPlatforms] = useState(false);
    const [showGenres, setShowGenres] = useState(false);
    const [showGames, setShowGames] = useState(false);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {/* Dropdown for Platforms */}
            <div className="mb-4">
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" 
                    onClick={() => setShowPlatforms(!showPlatforms)}
                >
                    {selectedPlatform ? selectedPlatform.name : "Select a Platform"}
                </button>
                {showPlatforms && (
                    <div className="mt-2 border border-gray-200 rounded-lg shadow-lg">
                        {platforms.map(platform => (
                            <PlatformComponent 
                                key={platform.id} 
                                platform={platform} 
                                onSelect={() => {
                                    setSelectedPlatform(platform);
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
                >
                    {selectedGenre ? selectedGenre.name : "Select a Genre"}
                </button>
                {showGenres && (
                    <div className="mt-2 border border-gray-200 rounded-lg shadow-lg">
                        {genres.map(genre => (
                            <GenreComponent 
                                key={genre.id} 
                                genre={genre} 
                                onSelect={() => {
                                    setSelectedGenre(genre);
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
                >
                    {selectedGenre ? "Select a Game" : "Select a Game"}
                </button>
                {showGames && (
                    <div className="mt-2 border border-gray-200 rounded-lg shadow-lg">
                        {games
                            .filter(game => 
                                (!selectedPlatform || selectedPlatform.games.includes(game.id)) && 
                                (!selectedGenre || game.genreId === selectedGenre.id)
                            )
                            .map(game => (
                                <GameComponent 
                                    key={game.id} 
                                    game={game} 
                                    onSelect={() => {
                                        setShowGames(false); 
                                    }} 
                                />
                            ))}
                    </div>
                )}
            </div>

            {/* Joined Tournaments Section */}
            <h2 className="text-2xl font-bold mb-4">Joined Tournaments</h2>
            
            {/* Available Tournaments Section */}
            <h2 className="text-2xl font-bold mb-4">Available Tournaments</h2>
            <div>
                {loading && <p>Loading tournaments...</p>}
                {error && <p>Error fetching tournaments: {error}</p>}
                {tournaments && tournaments.length === 0 && <p>No available tournaments.</p>}
                {tournaments && tournaments.length > 0 && (
                    <div className="mt-2 border border-gray-200 rounded-lg shadow-lg p-4">
                        {tournaments.map(tournament => (
                            <div key={tournament.id} className="p-2 border-b last:border-b-0">
                                <h3 className="font-semibold">{tournament.name}</h3>
                                <p>Prize: {tournament.prize}</p>
                                <p>Start Date: {tournament.startDate}</p>
                                {/* Additional tournament details */}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-4">
                <AddTournament />
            </div>
        </div>
    );
};

export default DashboardComponent;