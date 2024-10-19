const TournamentComponent = ({ tournament }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
            <div className="border-b mb-2 pb-2 last:border-b-0">
                <h3 className="text-lg font-medium">{tournament.tournamentStyle}</h3>
                <p className="text-gray-600">Prize: ${tournament.prize}</p>
                <p className="text-gray-600">Start: {new Date(tournament.startDate).toLocaleDateString()} at {tournament.startTime}</p>
                <p className="text-gray-600">Max Players: {tournament.maxPlayers}</p>
            </div>
        </div>
    );
};

export default TournamentComponent;