"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import API, { setAuthHeader } from '../axios/api';
import { useUser } from './userContext';

const APIContext = createContext();

// Provider component to wrap your app
export const APIProvider = ({ children }) => {
    const { session } = useUser();
    const [platforms, setPlatforms] = useState([]);
    const [games, setGames] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true); // New loading state
    const [error, setError] = useState(null); // New error state

    useEffect(() => {
        if (session?.access_token) {
            setAuthHeader(session.access_token);
            initializeSite(); // Call the function to fetch data
        }
    }, [session]); // Run when session changes

    const initializeSite = async () => {
        setLoading(true); // Start loading
        try {
            const [platformsResponse, gamesResponse, tournamentsResponse, genresResponse] = await Promise.all([
                API.get('/platforms'),
                API.get('/games'),
                API.get('/tournaments'),
                API.get('/genre'),
            ]);
            setPlatforms(platformsResponse.data);
            setGames(gamesResponse.data);
            setTournaments(tournamentsResponse.data);
            setGenres(genresResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error.message); // Set the error state
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <APIContext.Provider value={{ platforms, games, tournaments, genres, loading, error }}>
            {children}
        </APIContext.Provider>
    );
};

// Hook to use the store
export const useSite = () => {
    return useContext(APIContext);
};