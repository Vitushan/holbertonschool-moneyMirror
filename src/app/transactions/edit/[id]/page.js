"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditTransaction() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({
    amount: "",
    type: "",
    category: "",
    description: "",
    note: "",
    currencyType: "currency",
    currency: "EUR",
    date: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Currency and crypto lists
  const currencies = [
    { value: "EUR", label: "🇪🇺 EUR - Euro" },
    { value: "USD", label: "🇺🇸 USD - US Dollar" },
    { value: "GBP", label: "🇬🇧 GBP - Pound Sterling" },
    { value: "CHF", label: "🇨🇭 CHF - Swiss Franc" },
    { value: "JPY", label: "🇯🇵 JPY - Yen" },
    { value: "CAD", label: "🇨🇦 CAD - Canadian Dollar" },
    { value: "AUD", label: "🇦🇺 AUD - Australian Dollar" }
  ];

  const cryptocurrencies = [
    { value: "BTC", label: "₿ BTC - Bitcoin" },
    { value: "ETH", label: "Ξ ETH - Ethereum" },
    { value: "USDT", label: "₮ USDT - Tether" },
    { value: "BNB", label: "BNB - Binance Coin" },
    { value: "SOL", label: "◎ SOL - Solana" },
    { value: "XRP", label: "XRP - Ripple" },
    { value: "ADA", label: "₳ ADA - Cardano" },
    { value: "DOGE", label: "Ð DOGE - Dogecoin" }
  ];

  // Load existing transaction data
  useEffect(() => {
    const fetchTransaction = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/transactions/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("The transaction does not exist or has been deleted.");
          } else {
            throw new Error("Error while fetching the transaction.");
          }
        }
        const data = await res.json();
        setForm({
          amount: data.amount || "",
          type: data.type || "",
          category: data.category || "",
          description: data.description || "",
          note: data.note || "",
          currencyType: data.currencyType || "currency",
          currency: data.currency || "EUR",
          date: data.date ? data.date.split('T')[0] : ""
        });
      } catch (err) {
        setError(err.message || "Unknown error.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTransaction();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If currency type changes, reset the currency
    if (name === "currencyType") {
      setForm((prev) => ({ 
        ...prev, 
        [name]: value,
        currency: value === "currency" ? "EUR" : "BTC"
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Error and Success message
    if (!form.amount || !form.type || !form.category || !form.date) {
        setError("All required fields must be filled.");
        return;
    }

    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
        setError("Amount must be a valid number greater than 0.");
        return;
    }

    const selectedDate = new Date(form.date);
    const today = new Date();
    if (selectedDate > today) {
        setError("Sorry, the date cannot be in the future!");
        return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
        }),
      });

      if (!response.ok) throw new Error("Error when updating the transaction!");
      
      setSuccess("Transaction updated successfully!");
      setTimeout(() => router.push("/transactions"), 1500);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF]">
        <div className="text-lg text-blue-600 font-medium">Loading...</div>
      </div>
    );
  }

  // Simplify the form fields to display only the current values for clarity
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF] p-6">
      <div className="w-full max-w-2xl">
        {/* Header with icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full mb-4 shadow-lg">
            <span className="text-4xl text-white font-bold">✏️</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Transaction</h1>
          <p className="text-gray-600">Update your transaction details</p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Error and Success messages */}
          {success && (
            <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-lg text-center">
              <p className="text-green-700 font-semibold">{success}</p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-red-700 font-medium text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
              <input 
                type="text" 
                name="amount" 
                value={form.amount} 
                onChange={handleChange} 
                required 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none" 
              />
            </div>

            {/* Currency Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Currency Type</label>
              <select 
                name="currencyType" 
                value={form.currencyType} 
                onChange={handleChange} 
                required 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-gray-700 outline-none"
              >
                <option value="currency">Currency</option>
                <option value="cryptocurrency">Cryptocurrency</option>
              </select>
            </div>

            {/* Currency */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Currency</label>
              <select 
                name="currency" 
                value={form.currency} 
                onChange={handleChange} 
                required 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-gray-700 outline-none"
              >
                {form.currencyType === "currency" ? (
                  currencies.map((curr) => (
                    <option key={curr.value} value={curr.value}>{curr.label}</option>
                  ))
                ) : (
                  cryptocurrencies.map((crypto) => (
                    <option key={crypto.value} value={crypto.value}>{crypto.label}</option>
                  ))
                )}
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
              <select 
                name="type" 
                value={form.type} 
                onChange={handleChange} 
                required 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-gray-700 outline-none"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <input 
                type="text" 
                name="category" 
                value={form.category} 
                onChange={handleChange} 
                required 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none" 
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
              <input 
                type="date" 
                name="date" 
                value={form.date} 
                onChange={handleChange} 
                required 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none" 
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <input 
                type="text" 
                name="description" 
                value={form.description} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none" 
              />
            </div>

            {/* Note */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Note</label>
              <input 
                type="text" 
                name="note" 
                value={form.note} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none" 
              />
            </div>

            {/* Action buttons */}
            <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => router.push("/transactions")}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg hover:bg-gray-300 transition font-semibold text-lg"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={saving} 
                className="flex-1 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Updating..." : "Update Transaction"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}