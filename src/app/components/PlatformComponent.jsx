const PlatformComponent = ({ platform, onSelect }) => {
    return (
        <div 
            className="bg-gray-100 shadow-lg rounded-lg p-4 cursor-pointer hover:bg-gray-200 transition duration-200" 
            onClick={() => onSelect(platform)} // Call onSelect with the platform data
            role="button" 
            tabIndex="0" // Make the div focusable
            onKeyPress={(e) => e.key === 'Enter' && onSelect(platform)} // Allow selection with keyboard
            aria-label={`Select platform: ${platform.name}`} // Accessibility label
        >
            <h3 className="text-lg font-medium">{platform.name}</h3>
            {/* Optionally, you could list some game names here */}
            <p className="text-gray-600">Games available: {platform.games.length}</p>
            {platform.games.length > 0 && (
                <ul className="mt-2 list-disc list-inside">
                    {platform.games.slice(0, 3).map(game => ( // Show up to 3 game names
                        <li key={game.id} className="text-gray-700">
                            {game.title}
                        </li>
                    ))}
                    {platform.games.length > 3 && <li className="text-gray-700">...and more</li>}
                </ul>
            )}
        </div>
    );
};

export default PlatformComponent;