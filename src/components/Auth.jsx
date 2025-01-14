import { useState } from 'react';
import { supabase } from '@/app/axios/supabase';
import { useUser } from '../app/context/userContext';
import { setAuthHeader } from '../app/axios/api';

export default function Auth() {
  const { setSession, setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setUser(data.user);
    setSession(data.session);
    setAuthHeader(data.session.access_token);
    setEmail('');
    setPassword('');
    alert('Signup successful! Check your email.');
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setUser(data.user);
    setSession(data.session);
    setAuthHeader(data.session.access_token);
    setEmail('');
    setPassword('');
    alert('Login successful!');
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-800">Authentication</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col space-y-3">
        <button
          onClick={handleSignup}
          disabled={loading}
          className={`w-full px-4 py-2 ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-lg hover:bg-blue-600 transition duration-300`}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full px-4 py-2 ${loading ? 'bg-gray-400' : 'bg-green-500'} text-white rounded-lg hover:bg-green-600 transition duration-300`}
        >
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </div>
    </div>
  );
}