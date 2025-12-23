'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginStart, loginSuccess } from '@/features/auth/authSlice';
import { Loader2 } from 'lucide-react';

export default function LoginForm() {
  const [username, setUsername] = useState('johndoe');
  const [password, setPassword] = useState('password123');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());

    // Simulate API call
    setTimeout(() => {
      dispatch(
        loginSuccess({
          username,
          token: 'fake-jwt-token-123',
          isAuthenticated: true,
        })
      );
      router.push('/');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="username" className="block text-sm font-bold text-gray-800">
          Username
        </label>
        <div className="mt-1">
          <input
            id="username"
            name="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full appearance-none rounded-md border-2 border-gray-400 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-bold text-gray-800">
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full appearance-none rounded-md border-2 border-gray-400 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Sign in'}
        </button>
      </div>
      
      <div className="text-xs text-center text-gray-500">
        (Mock Login: Use any credentials)
      </div>
    </form>
  );
}
