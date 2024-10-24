import { useState } from 'react';
import { supabase } from '../app/axios/supabase';
import { useUser } from '../app/context/userContext';
import API from '../app/axios/api';

const JoinComponent = ({ tournament, setTournament }) => {
    const { user } = useUser();
    const [joinedTournaments, setJoinedTournaments] = useState(user.user_metadata.joinedTournaments)

    
    const handleJoinTournament = async () => {
        const currentPlayer = tournament.players.find((players)=>{players.id === player.id})
        if (tournament.players.length < tournament.maxPlayers && !currentPlayer) {
            setTournament({ ...tournament, players: [...tournament.players, player] });
            let tournaments = joinedTournaments;
            tournaments.push(tournament);
            await supabase.auth.updateUser({
        email: user.email,
        data: {
            joinedTournaments: tournaments
        }
       
    });
        await API.put(`/tournmants${tournament.id}` , tournament)
        } else {
            console.log('Tournament is full or you have already joined');
        }
    };

    return (
        <div>
            <button onClick={handleJoinTournament}>Join Tournament</button>
            <h3>Players in Tournament:</h3>
            <ul>
                {tournament.playerNames.map((currentUser, index) => (
                    <li key={index}>{currentUser.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default JoinComponent;