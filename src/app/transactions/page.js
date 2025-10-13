//Transactions List Page with edit/delete action and connect API

'use client' //tells Next.js that this component is client-side (React)
import { useEffect, useState } from "react" //manage state and side effects (fetch API, etc.) [useEffect for start fetch)]


export default function TransactionsPage() { // display transactions lists
    const [transactions, setTransactions] = useState([]); // will contain the list of transactions retrieved from the API
    const [loading, setLoading] = useState(true); // manage the display of the loader
    const [error, setError] = useState(''); // manage the display of the loader

    useEffect(() => {
        async function fetchTransactions() { // noted loading start
            setLoading(true);
            setError('');
            try {
                const res = await fetch('/api/transactions'); // CALL API
                if (!res.ok) throw new Error('Error while fetching');
                const data = await res.json(); // get json data
                setTransactions(data); // stores transactions in the state and automatically updates the UI
            } catch (err) {
                setError(err.message || 'Unknown error');  // stores the error if needed
            } finally {
                setLoading(false); // loading is finished
            }
        }
        fetchTransactions(); //launch the function
    }, []); // if [] is empty = only on page load

   // conditional rendering
   if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-lg text-blue-600 font-medium">Loading...</div>
        </div>);
   }
   if (error) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg w-full max-w-md">
                <p className="text-red-700 font-medium text-center">{ error}</p>
                </div>
            </div>
    );
}
   return (
    <div className=""></div>
   );
}
