'use client' // Client Component - required for browser features (useState, events, DOM interaction)

import { useState, useEffect } from "react"
 
export default function Register() {
  // Form data states - React hooks for controlled components
  const [username, setUsername] = useState(''); //This is a react function
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // For UI feedback states
  const [message, setMessage] = useState('');         // Message text to display
  const [messageType, setMessageType] = useState(''); // 'success' or 'error' for styling
  const [isLoading, setIsLoading] = useState(false);  // Loading state for button/form

  // Ensure dynamic data like Date.now() or Math.random() is handled properly
  // Example: Move dynamic data to useEffect or useState to avoid hydration mismatch
  const [timestamp, setTimestamp] = useState(null);
  useEffect(() => {
    setTimestamp(Date.now());
  }, []);

  // Form submission handler - async function for API calls
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission (page reload)
    setIsLoading(true);  // Start loading state (loading)
    setMessage('');      // Clear previous messages
    
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
        window.location.href = '/dashboard';
      } else {
        console.error('Registration failed:', data.error);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setMessage(error.message);
      setMessageType('error');
      setIsLoading(false);       // Stop loading state (loading end)
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8"> {/* className = styles Tailwind (class)*/}
      <h1 className="text-3xl font-bold mb-6">Register - MoneyMirror</h1>

    {/* Dynamic CSS classes - CONDITIONAL RENDERING: Show message only when it exists */}
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
  
      {/*Registration form*/}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      
        {/* CONTROLLED INPUTS: value from state, onChange updates state */}
        <input type="text"
        id="username"
        name="username"
        placeholder="Username"
        value={username}
        onChange= {(e) => setUsername(e.target.value)} // (e) for event and target value for actually value
        className="border rounded p-2"
        required
        autocomplete="username"/>

        <input type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded p-2"
        required
        autocomplete="email"/>

        <input type="password"
        id="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded p-2"
        required
        autocomplete="new-password"/>

        <input type="password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border rounded p-2"
        required
        autocomplete="new-password"/>


      {/* DYNAMIC SUBMIT BUTTON: disabled during loading, text changes, cursor shows loading state */}
      <button 
        type="submit" 
        disabled={isLoading}
        className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Loading...' : 'Sign Up'} 
      </button>
        </form>
    </main>
  );
}
