import React, { useState } from 'react';

const JoinComponent = ({ tournament, setTournament }) => {
    const [playerName, setPlayerName] = useState('');

    const handleJoinTournament = () => {
        if (tournament.playerNames.length < tournament.maxPlayers) {
            setTournament({ ...tournament, playerNames: [...tournament.playerNames, playerName] });
            setPlayerName('');
        } else {
            console.log('Tournament is full.');
        }
    };

    return (
        <div>
            <h2>Join Tournament</h2>
            <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
            />
            <button onClick={handleJoinTournament}>Join Tournament</button>

            <h3>Players in Tournament:</h3>
            <ul>
                {tournament.playerNames.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>
        </div>
    );
};

export default JoinComponent;