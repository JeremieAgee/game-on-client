const GameComponent = ({ game }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold">{game.title}</h3>
            {/* Add more information if needed */}
        </div>
    );
};

export default GameComponent;