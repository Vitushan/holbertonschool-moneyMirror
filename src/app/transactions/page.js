//transactionLists

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "../../components/Modal"; // Assuming a Modal component exists

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState(""); // New state for delete-specific errors
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const router = useRouter();
  const [balance, setBalance] = useState(0);

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
        setBalance(calculateBalance(data.transactions || [])); // Calcul du solde ici
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  const calculateBalance = (transactions) => {
    return transactions.reduce((total, transaction) => {
      return transaction.type === "income"
        ? total + transaction.amount
        : total - transaction.amount;
    }, 0);
  };

  const calculateIncomeAndExpenses = (transactions) => {
    return transactions.reduce(
      (totals, transaction) => {
        if (transaction.type === "income") {
          totals.income += transaction.amount;
        } else {
          totals.expenses += transaction.amount;
        }
        return totals;
      },
      { income: 0, expenses: 0 }
    );
  };

  const { income, expenses } = calculateIncomeAndExpenses(transactions);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const openModal = (id) => {
    setTransactionToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setTransactionToDelete(null);
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    if (!transactionToDelete) return;

    setDeleteError("");
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/transactions/${transactionToDelete}`, { method: "DELETE" });
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Transaction not found (404)");
        } else if (res.status === 500) {
          throw new Error("Server error (500)");
        } else {
          throw new Error("Failed to delete the transaction");
        }
      }

      await reloadTransactions();
    } catch (err) {
      setDeleteError(err.message || "An unexpected error occurred during deletion");
    } finally {
      setIsDeleting(false);
      closeModal();
      setTimeout(() => setDeleteError(""), 5000);
    }
  };

  const reloadTransactions = async () => {
    setIsReloading(true); // Start loading indicator
    try {
      const updatedRes = await fetch("/api/transactions");
      if (!updatedRes.ok) throw new Error("Failed to fetch updated transactions");
      const updatedData = await updatedRes.json();
      setTransactions(updatedData.transactions || []);
    } catch (err) {
      setError(err.message || "An unexpected error occurred while reloading transactions");
    } finally {
      setIsReloading(false); // Stop loading indicator
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
  if (isDeleting || isReloading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF]">
        <div className="text-lg text-blue-600 font-medium">Processing...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF] p-6">
      <div className="w-full max-w-6xl bg-white shadow rounded-lg overflow-x-auto">
        {/* Title reverted to original size and position */}
        <h1 className="text-3xl font-bold mb-6 text-center">List of Transactions</h1>
        {/* Add Transaction Button at the top-right */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => router.push('/transactions/add')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Transaction
          </button>
        </div>
        <div className="p-4 border border-gray-300 rounded-md mb-8 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Total Income:</span>
            <span className="text-sm font-bold text-green-600">{formatAmount(income)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Total Expenses:</span>
            <span className="text-sm font-bold text-red-600">{formatAmount(expenses)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Total Sold:</span>
            <span className="text-sm font-bold text-blue-900">{formatAmount(balance)}</span>
          </div>
        </div>
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
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-500 text-lg font-medium">No transactions found</p>
                    <p className="text-gray-400 text-sm mt-2">Start by adding your first transaction!</p>
                  </div>
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{new Date(transaction.date).toLocaleDateString("fr-FR")}</td>
                  <td className="px-6 py-4 text-sm">{transaction.description || "-"}</td>
                  <td className="px-6 py-4 text-sm">{transaction.category}</td>
                  <td className={`px-6 py-4 text-sm text-right ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                    {formatAmount(transaction.amount)}
                  </td>
                  <td className="px-6 py-4 text-sm">{transaction.note || "-"}</td>
                  <td className="px-6 py-4 text-sm text-center">
                    <button onClick={() => handleEdit(transaction.id)} className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button onClick={() => openModal(transaction.id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {isModalOpen && (
          <Modal onClose={closeModal} onConfirm={confirmDelete}>
            <p>Are you sure you want to delete this transaction?</p>
          </Modal>
        )}
      </div>
    </div>
  );
}