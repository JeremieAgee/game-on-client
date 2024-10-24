"use client";
import React, { useState } from "react";
import API from "../app/axios/api";
import { useUser } from "../app/context/userContext";
import { useSite } from "../app/context/apiContext";

const AddTournament = ({ findGamesByPlatform }) => {
  const { user } = useUser();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    hostId: user.id,
    gameId: "",
    genreId: "",
    platformId: "",
    prize: "",
    startDate: "",
    startTime: "",
    maxPlayers: "",
    tournamentStyle: "",
  });
  const { platforms, games, tournaments, setTournaments } = useSite();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showedGames, setShowedGames] = useState(games);
  const showForm = (e) => {
    e.preventDefault();
    setShow(!show);
    if (!show) {
      setMessage(""); // Reset message when showing the form
      setErrorMessage(""); // Reset error message when showing the form
    }
    
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChangePlatform = (e) => {
    setShowedGames(findGamesByPlatform(e.target.value));
    setFormData({ ...formData, ["platformId"]: e.target.value });
  };

  const validateForm = () => {
    const { gameId, platformId, prize, startDate, startTime, maxPlayers, tournamentStyle } = formData;
    const foundGame = games.find((game)=>{return gameId===game.id})
    if (!gameId || !foundGame.genreId || !platformId || !prize || !startDate || !startTime || !maxPlayers || !tournamentStyle) {
      setErrorMessage("All fields are required.");
      return false;
    } else {
      setFormData({hostId: user.id,
        gameId: gameId,
        genreId: foundGame.id,
        platformId: platformId,
        prize: prize,
        startDate: startDate,
        startTime: startTime,
        maxPlayers: maxPlayers,
        tournamentStyle: tournamentStyle})
    }
    setErrorMessage(""); // Clear error message
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Validate form before proceeding

    try {
      const response = await API.post("/tournaments", formData);
      setMessage("Tournament added successfully!");
      let newTournaments = tournaments;
      newTournaments.push(formData);
      setTournaments(newTournaments);
      setFormData({ 
        hostId: user.id,
        gameId: "",
        genreId: "",
        platformId: "",
        prize: "",
        startDate: "",
        startTime: "",
        maxPlayers: "",
        tournamentStyle: ""
      });
      
    } catch (error) {
      console.error(error);
      setMessage("Error adding tournament.");
    }
  };

  return (
    <div className="bg-gray-800 text-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 cursor-pointer" onClick={showForm}>Add Tournament</h2>
      {show && (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <select
            name="platformId"
            onChange={handleChangePlatform}
            className="mb-3 p-2 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
            value={formData.platformId}
          >
            <option value="" disabled>Select Platform</option>
            {platforms.map((platform) => (
              <option key={platform.id} value={platform.id}>
                {platform.name}
              </option>
            ))}
          </select>
          <select
            name="gameId"
            onChange={handleChange}
            className="mb-3 p-2 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
            value={formData.gameId}
          >
            <option value="" disabled>Select Game</option>
            {showedGames.map((game) => (
              <option key={game.id} value={game.id}>
                {game.title}
              </option>
            ))}
          </select>
          <input
            name="prize"
            placeholder="Prize"
            value={formData.prize}
            onChange={handleChange}
            className="mb-3 p-2 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            min={0}
            required
          />
          <input
            name="startDate"
            placeholder="Start Date"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            className="mb-3 p-2 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            name="startTime"
            placeholder="Start Time"
            type="time"
            value={formData.startTime}
            onChange={handleChange}
            className="mb-3 p-2 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            name="maxPlayers"
            placeholder="Max Players"
            value={formData.maxPlayers}
            onChange={handleChange}
            className="mb-3 p-2 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            min={0}
            required
          />
          <input
            name="tournamentStyle"
            placeholder="Tournament Style"
            value={formData.tournamentStyle}
            onChange={handleChange}
            className="mb-3 p-2 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Add Tournament
          </button>
        </form>
      )}
      {message && <p className="mt-4 text-green-400">{message}</p>}
      {errorMessage && <p className="mt-4 text-red-400">{errorMessage}</p>}
    </div>
  );
};

export default AddTournament;