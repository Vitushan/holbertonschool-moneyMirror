'use client'

import { useState, useEffect } from "react"

export default function Register() {
  // Form data states - React hooks for controlled components
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI feedback states
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Ensure dynamic data like Date.now() is handled properly to avoid hydration mismatch
  const [timestamp, setTimestamp] = useState(null);
  useEffect(() => {
    setTimestamp(Date.now());
  }, []);

  // Form submission handler - async function for API calls
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // API call to backend registration endpoint
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Registration successful! Redirecting...');
        setMessageType('success');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      } else {
        setMessage(data.error || 'Registration failed');
        setMessageType('error');
        setIsLoading(false);
      }
    } catch (error) {
      setMessage(error.message);
      setMessageType('error');
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">Register - MoneyMirror</h1>

      {/* Dynamic CSS classes - Show message only when it exists */}
      {message && (
        <div className={(() => {
          let messageClasses;
          if (messageType === 'success') {
            messageClasses = `mb-4 p-4 rounded-lg bg-green-100 text-green-800 border border-green-300`;
          } else {
            messageClasses = `mb-4 p-4 rounded-lg bg-red-100 text-red-800 border border-red-300`;
          }
          return messageClasses;
        })()}>
          {message}
        </div>
      )}

      {/* Registration form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">

        {/* Controlled inputs: value from state, onChange updates state */}
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded p-2"
          required
          autoComplete="username"
        />

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2"
          required
          autoComplete="email"
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-2"
          required
          autoComplete="new-password"
        />

        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border rounded p-2"
          required
          autoComplete="new-password"
        />

        {/* Dynamic submit button: disabled during loading */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
