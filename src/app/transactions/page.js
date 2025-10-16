//transactionLists

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState(""); // New state for delete-specific errors
  const router = useRouter();

  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/transactions");
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Transactions not found (404)");
          } else if (res.status === 500) {
            throw new Error("Server error (500)");
          } else {
            throw new Error("Error while fetching transactions");
          }
        }
        const data = await res.json();
        setTransactions(data.transactions || []);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;

    setDeleteError(""); // reinitializing before start
    try {
      const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Transaction not found (404)");
        } else if (res.status === 500) {
          throw new Error("Server error (500)");
        } else {
          throw new Error("Failed to delete the transaction");
        }
      }

      await reloadTransactions(); // Function separated for loaded data
    } catch (err) {
      setDeleteError(err.message || "An unexpected error occurred during deletion");
    } finally {
      setTimeout(() => setDeleteError(""), 5000); // message deleted after 5 seconds
    }
  };

  const reloadTransactions = async () => {
    try {
      const updatedRes = await fetch("/api/transactions");
      if (!updatedRes.ok) throw new Error("Failed to fetch updated transactions");
      const updatedData = await updatedRes.json();
      setTransactions(updatedData.transactions || []);
    } catch (err) {
      setError(err.message || "An unexpected error occurred while reloading transactions");
    }
  };

  const handleEdit = async (id) => {
    if (!id) {
      console.error("Invalid transaction ID");
      return;
    }
    try {
      router.push(`/transactions/edit/${id}`);
    } catch (err) {
      console.error("Failed to navigate to the edit page", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF]">
        <div className="text-lg text-blue-600 font-medium">Loading...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF]">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg w-full max-w-md">
          <p className="text-red-700 font-medium text-center">{error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF] p-6">
      <div className="w-full max-w-6xl bg-white shadow rounded-lg overflow-x-auto">
        <h1 className="text-3xl font-bold text-gray-800 p-6 text-center border-b border-gray-200">
          List of Transactions
        </h1>
        {deleteError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
            <p className="text-red-700 font-medium text-center">{deleteError}</p>
          </div>
        )}
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Category</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Note</th>
              <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{new Date(transaction.date).toLocaleDateString("fr-FR")}</td>
                <td className="px-6 py-4 text-sm">{transaction.description}</td>
                <td className="px-6 py-4 text-sm">{transaction.category}</td>
                <td className="px-6 py-4 text-sm text-right">{formatAmount(transaction.amount)}</td>
                <td className="px-6 py-4 text-sm">{transaction.note}</td>
                <td className="px-6 py-4 text-sm text-center">
                  <button onClick={() => handleEdit(transaction.id)} className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button onClick={() => handleDelete(transaction.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
