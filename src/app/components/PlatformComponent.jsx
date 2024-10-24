import { useState } from "react";

const PlatformComponent = ({ platform, findGamesByPlatform, onSelect }) => {
    const [games, setGames] = useState(findGamesByPlatform(platform.id));
    return (
        <div 
            className="bg-gray-100 shadow-lg rounded-lg p-4 cursor-pointer hover:bg-gray-200 transition duration-200" 
            onClick={() => onSelect(platform)} // Call onSelect with the platform data
            role="button" 
            tabIndex="0" // Make the div focusable
            aria-label={`Select platform: ${platform.name}`} // Accessibility label
        >
            <h3 className="text-lg font-medium">{platform.name}</h3>
            {/* Optionally, you could list some game names here */}
            <p className="text-gray-600">Games available: {games.length}</p>
            {games.length > 0 && (
                <ul className="mt-2 list-disc list-inside">
                    {games.map(game => (
                        <li key={game.id} className="text-gray-700">
                            {game.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PlatformComponent;