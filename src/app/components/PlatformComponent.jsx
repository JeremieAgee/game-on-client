const PlatformComponent = ({ platform, onSelect }) => {
    return (
        <div 
            className="bg-gray-100 shadow-lg rounded-lg p-4 cursor-pointer hover:bg-gray-200" 
            onClick={() => onSelect(platform)} // Call onSelect with the platform data
        >
            <h3 className="text-lg font-medium">{platform.name}</h3>
            {/* You can also add a list of game names here if you want */}
            <p className="text-gray-600">Games available: {platform.games.length}</p>
        </div>
    );
};

export default PlatformComponent;