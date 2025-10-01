'use client' //Component that uses browser features (such as useState), required for interactive forms


import { useState } from "react"
 
export default function Register() {
  // form status
  const [username, setUsername] = useState(''); //UseState Stores form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // form submission
  const handleSubmit = async (e) => { //function called when the form is submitted
    e.preventDefault(); //prevents the page from reloading
    try {
      if (password !== confirmPassword) {
        throw new Error('The password is wrong'); // throw sends the error to the catch
    }

    console.log('Form submitted:', { username, email, password, confirmPassword});
    alert(`Hello ${username} welcome to your account !`);
  } catch (error) {
    console.error('Error:', error.message); // capture and display the error
    alert(`Error: ${error.message}`);
  }
}
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8"> {/* className = styles Tailwind (class)*/}
      <h1 className="text-3xl font-bold mb-6">Register - MoneyMirror</h1>
  
      {/*Registration form*/}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      
        {/*Username field*/}
        {/* (e) represents the event object (this is an object provided by React that contains lots of information about what happened) */}
        <input type="text"
        placeholder="Username"
        value={username}
        onChange= {(e) => setUsername(e.target.value)}
        className="border rounded p-2"
        required/>

        {/*Email field*/}
        {/* e.target refers to the element that triggered the event.*/}
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
      
      {/*Password field*/}
      {/*type="password hides the password in "****"*/}
      <input type="password"
      placeholder="Confirm password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      className="border rounded p-2"
      required/>

      {/*Submit button*/}
      <button type="submit" className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">Sign Up</button>
        </form>
    </main>
  );
}
