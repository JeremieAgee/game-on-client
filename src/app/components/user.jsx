import React, { useState, useEffect } from 'react';
import { supabase } from '../axios/supabase';
import { useUser } from '../context/userContext';
import { useSite } from '../context/apiContext';

const User = ({ initialPreferredGames = [], initialPreferredPlatform = "" }) => {
    const { user } = useUser(); 
    const { games, platforms } = useSite(); 
    const [preferredPlatform, setPreferredPlatform] = useState(initialPreferredPlatform);
    const [preferredGames, setPreferredGames] = useState(initialPreferredGames);
    const [name, setName] = useState(user?.user_metadata.name || "");
    const [currentGames, setCurrentGames] = useState([]);
    const [editMode, setEditMode] = useState(false); // Edit mode toggle

    // Update current games when preferredPlatform changes
    useEffect(() => {
        if (!preferredPlatform) return;
        const selectedPlatform = platforms.find(platform => platform.name === preferredPlatform);
        if (selectedPlatform) {
            const platformGames = selectedPlatform.games.map((gameId) => {
                return games.find(game => game.id === gameId);
            });
            setCurrentGames(platformGames.filter(game => game)); 
        }
    }, [preferredPlatform, platforms, games]);

    // Handle input changes for name and platform
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'preferredPlatform') {
            setPreferredPlatform(value);
        }
    };

    // Handle game selection (toggle game in the preferredGames array)
    const handleGameSelection = (e) => {
        const { value } = e.target;
        setPreferredGames(prevGames =>
            prevGames.includes(value)
                ? prevGames.filter(game => game !== value)
                : [...prevGames, value]
        );
    };

    // Submit updated user data to Supabase
    const submit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.updateUser({
            email: user.email,
            data: {
                name,
                preferredPlatform,
                preferredGames
            }
        });

        if (error) {
            console.error('Error updating user:', error);
        } else {
            console.log('User updated successfully:', data);
        }

        setEditMode(false); // Exit edit mode after saving
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-bold text-green-400 mb-4">User Profile</h2>
            {/* Edit Mode Button */}
            {!editMode && (
                <button
                    type="button"
                    onClick={() => setEditMode(true)}
                    className="w-full py-2 px-4 mb-4 bg-blue-500 hover:bg-blue-600 text-gray-100 font-bold rounded-lg transition-colors"
                >
                    Edit Profile
                </button>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-lg font-semibold">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="Enter your name"
                        required
                        disabled={!editMode}  // Disable input if not in edit mode
                    />
                </div>

                <div>
                    <label className="block text-lg font-semibold">Preferred Platform:</label>
                    <select
                        name="preferredPlatform"
                        value={preferredPlatform}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                        disabled={!editMode}  // Disable select if not in edit mode
                    >
                        <option value="">Select a platform</option>
                        {platforms.map(platform => (
                            <option key={platform.id} value={platform.name}>
                                {platform.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-lg font-semibold">Preferred Games:</label>
                    <div className="grid grid-cols-2 gap-2">
                        {editMode
                            ? currentGames.map(game => (
                                <label key={game.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={game.title}
                                        checked={preferredGames.includes(game.title)}
                                        onChange={handleGameSelection}
                                        className="form-checkbox text-green-500 h-5 w-5"
                                    />
                                    <span className="ml-2">{game.title}</span>
                                </label>
                              ))
                            : preferredGames.map((gameTitle, index) => (
                                <div key={index} className="p-2 bg-gray-700 rounded-md shadow-lg">
                                    {gameTitle}
                                </div>
                              ))
                        }
                    </div>
                </div>

                {editMode && (
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-gray-100 font-bold rounded-lg transition-colors"
                    >
                        Save Profile
                    </button>
                )}
            </form>
        </div>
    );
};

export default User;