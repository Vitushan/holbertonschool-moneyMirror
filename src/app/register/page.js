'use client' // Client Component - required for browser features (useState, events, DOM interaction)

import { useState } from "react"
 
export default function Register() {
  // Form data states - React hooks for controlled components
  const [username, setUsername] = useState(''); //This is a react function
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI feedback states - professional user experience
  const [message, setMessage] = useState('');         // Message text to display
  const [messageType, setMessageType] = useState(''); // 'success' or 'error' for styling
  const [isLoading, setIsLoading] = useState(false);  // Loading state for button/form

  // Form submission handler - async function for API calls
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission (page reload)
    setIsLoading(true);  // Start loading state (loading)
    setMessage('');      // Clear previous messages
    
    try {
      // Client-side validation - password confirmation
      if (password !== confirmPassword) {
        throw new Error('The password is wrong');
    }

    // API call to backend registration endpoint
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: username,  // Send username as 'name' field
        email,
        password,
      }),
    });

    if (response.ok) {
      // SUCCESS: Registration completed
      setMessage('Registration successful, Welcome to MoneyMirror !');
      setMessageType('success'); // Green styling
      setIsLoading(false);
      
      // Reset form fields after successful registration
      setUsername('');
      setEmail('');
      setPassword('');
    } else {
      // API returned error status
      throw new Error('Registration failed');
    }
  } catch (error) {
    // ERROR HANDLING: Both network errors and validation errors
    console.error('Error:', error.message); // Log for debugging
    setMessage(error.message);
    setMessageType('error');   // Red styling
    setIsLoading(false);       // Stop loading state (loading end)
  }
}
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8"> {/* className = styles Tailwind (class)*/}
      <h1 className="text-3xl font-bold mb-6">Register - MoneyMirror</h1>

    {/* CONDITIONAL RENDERING: Show message only when it exists */}
    {/* Dynamic CSS classes*/}
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
        {/* Username field */}
        <input type="text"
        placeholder="Username"
        value={username}
        onChange= {(e) => setUsername(e.target.value)} // (e) for event and target value for actually value
        className="border rounded p-2"
        required/>

        {/* Email field */}
        <input type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded p-2"
        required
        />
    
        {/*Password field*/}
        <input type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded p-2"
        required/>
      
      {/* Password confirmation field */}
      {/* type="password" masks input with dots for security */}
      <input type="password"
      placeholder="Confirm password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      className="border rounded p-2"
      required/>

      
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
