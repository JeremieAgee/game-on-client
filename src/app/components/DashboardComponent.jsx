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
  const [selectedGame, setSelectedGame] = useState(null); // Track selected game
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
          aria-haspopup="true"
          aria-expanded={showPlatforms}
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
          aria-haspopup="true"
          aria-expanded={showGenres}
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
          aria-haspopup="true"
          aria-expanded={showGames}
        >
          {selectedGame ? selectedGame.name : "Select a Game"}
        </button>
        {showGames && (
          <div className="mt-2 border border-gray-200 rounded-lg shadow-lg">
            {games.map(game => (
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

      <h2 className="text-2xl font-bold mb-4">Joined Tournaments</h2>
      {/* You might want to implement similar logic for joined tournaments here */}

      <AddTournament /> {/* Add tournament component here */}
    </div>
  );
};

export default DashboardComponent;