"use client"
import React, { useState } from "react";
import API from "../axios/api";
import { useUser } from "../context/userContext";

const AddTournament = () => {
const {user} = useUser();

  const [formData, setFormData] = useState({
    hostId: "",
    gameId: "",
    genreId: "",
    platformId: "",
    prize: "",
    startDate: "",
    startTime: "",
    maxPlayers: "",
    tournamentStyle: "",
    playerNames: [],
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setFormData({ ...formData, ["hostId"]: user.id });
    try {
      const response = await API.post("/tournaments", formData);
      console.log(response.data);
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      setMessage("Tournament added successfully!");
      
    } catch (error) {
      setMessage("Error adding tournament.");
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  };

  return (
    <div>
      <h2>Add Tournament</h2>
      <form onSubmit={handleSubmit}>
        
        <input name="gameId" placeholder="Game ID" onChange={handleChange} />
        <input name="genreId" placeholder="Genre ID" onChange={handleChange} />
        <input name="platformId" placeholder="Platform ID" onChange={handleChange} />
        <input name="prize" placeholder="Prize" onChange={handleChange} />
        <input name="startDate" placeholder="Start Date" type="date" onChange={handleChange} />
        <input name="startTime" placeholder="Start Time" type="time" onChange={handleChange} />
        <input name="maxPlayers" placeholder="Max Players" onChange={handleChange} />
        <input name="tournamentStyle" placeholder="Tournament Style" onChange={handleChange} />
        <button type="submit">Add Tournament</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddTournament;