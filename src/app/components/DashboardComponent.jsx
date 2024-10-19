//import TournamentComponent from "../components/TournamentComponent"; // New Tournament component
import { useSite } from "../context/apiContext";
import GameComponent from "../components/GameComponent"; // New Game component
import PlatformComponent from "../components/PlatformComponent"; // New Platform component
import GenreComponent from "../components/GenreComponent"; // New Genre component

const DashboardComponent = () => {
    const { platforms, games, genres, loading, error } = useSite(); // Get data from context

    // Show loading state
    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

    // Show error state
    if (error) {
        return <div className="p-8 text-red-500">Error fetching data: {error}</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            {/* Only show Logout if user is logged in */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                {games.map(game => (
                    <GameComponent key={game.id} game={game} />
                ))}
                {platforms.map(platform => (
                    <PlatformComponent key={platform.id} platform={platform} />
                ))}
                {genres.map(genre => (
                    <GenreComponent key={genre.id} genre={genre} />
                ))}
                {/* You can also include tournaments if needed */}
                {/* {tournaments.map(tournament => (
                    <TournamentComponent key={tournament.id} tournament={tournament} />
                ))} */}
            </div>
        </div>
    );
};
export default DashboardComponent;