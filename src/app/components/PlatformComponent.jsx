const PlatformComponent = ({ platform }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
            <h3 className="text-lg font-medium">{platform.name}</h3>
            <p className="text-gray-600">Games: {platform.games.join(', ')}</p> {/* Display associated games */}
        </div>
    );
};

export default PlatformComponent;