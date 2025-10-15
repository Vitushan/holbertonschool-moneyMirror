//Transactions List Page with edit/delete action and connect API

'use client' //tells Next.js that this component is client-side (React)
import { useEffect, useState } from "react" //manage state and side effects (fetch API, etc.) [useEffect for start fetch)]
import { useRouter } from "next/navigation";

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
                setTransactions(data.transactions || []); // stores transactions in the state and automatically updates the UI
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="w-full max-w-6xl bg-white shadow rounded-lg overflow-x-auto">
            <h1 className="text-3xl font-bold text-gray-800 p-6 text-center border-b border-gray-200">Lists Transaction</h1>
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Note</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead> 
                <tbody className="divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm">{new Date(transaction.date).toLocaleDateString('fr-FR')}</td>
                            <td className="px-6 py-4 text-sm">{transaction.description}</td>
                            <td className="px-6 py-4 text-sm">{transaction.category}</td>
                            <td className="px-6 py-4 text-sm text-right">{transaction.amount}</td>
                            <td className="px-6 py-4 text-sm">{transaction.note}</td>
                             <td className="px-6 py-4 text-sm text-center">
                                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                <button className="text-red-600 hover:text-red-900">Delete</button>
                             </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
   );
}
