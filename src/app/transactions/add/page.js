"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTransactionPage() {
  const [form, setForm] = useState({
    amount: "",
    type: "",
    category: "",
    description: "",
    note: "",
  currencyType: "currency", // "currency" or "cryptocurrency"
    currency: "EUR",
    date: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

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

    // Check if the amount is a valid number
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      setError("Le montant doit être un nombre valide supérieur à 0.");
      return;
    }

    // Check if the date is in the future
    const selectedDate = new Date(form.date);
    const today = new Date();
    if (selectedDate > today) {
      setError("Sorry, don't travel to the future!");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
        }),
      });
      if (!res.ok) throw new Error("Failed to add transaction");
      setSuccess("Transaction successfully added!");
      setForm({
        amount: "",
        type: "",
        category: "",
        description: "",
        note: "",
        currencyType: "currency",
        currency: "EUR",
        date: "",
      });
      setTimeout(() => router.push("/transactions"), 1500);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF] p-6">
      <div className="w-full max-w-2xl">
        {/* Header with icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full mb-4 shadow-lg">
            <span className="text-4xl text-white font-bold">$</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Add Transaction</h1>
          <p className="text-gray-600">Track your income and expenses</p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount field at the top */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <span className="text-blue-500 mr-2">$</span>
                Amount <span className="text-red-500 ml-1">*</span>
              </label>
              <input 
                type="text" 
                name="amount" 
                value={form.amount} 
                onChange={(e) => {
                  const value = e.target.value.trim();
                  // Validate using parseFloat to ensure proper number format
                  if (!isNaN(value) && parseFloat(value) > 0) {
                    handleChange(e);
                  }
                }} 
                required 
                placeholder="0.00"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none" 
              />
            </div>

            {/* Currency Type & Currency grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-blue-500 mr-2">💱</span>
                  Currency Type <span className="text-red-500 ml-1">*</span>
                </label>
                <select 
                  name="currencyType" 
                  value={form.currencyType} 
                  onChange={handleChange} 
                  required 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-gray-700 outline-none"
                >
                  <option value="currency">💵 Currency</option>
                  <option value="cryptocurrency">₿ Cryptocurrency</option>
                </select>
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-blue-500 mr-2">
                    {form.currencyType === "currency" ? "💰" : "₿"}
                  </span>
                  {form.currencyType === "currency" ? "Currency" : "Cryptocurrency"} <span className="text-red-500 ml-1">*</span>
                </label>
                <select 
                  name="currency" 
                  value={form.currency} 
                  onChange={handleChange} 
                  required 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-gray-700 outline-none"
                >
                  {form.currencyType === "currency" ? (
                    currencies.map((curr) => (
                      <option key={curr.value} value={curr.value}>
                        {curr.label}
                      </option>
                    ))
                  ) : (
                    cryptocurrencies.map((crypto) => (
                      <option key={crypto.value} value={crypto.value}>
                        {crypto.label}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="mr-2">⚖️</span>
                Type <span className="text-red-500">*</span>
              </label>
              <select 
                name="type" 
                value={form.type} 
                onChange={handleChange} 
                required 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-gray-700 outline-none"
              >
                <option value="">Select type</option>
                <option value="income">💰 Income</option>
                <option value="expense">💸 Expense</option>
              </select>
            </div>

            {/* Category & Date grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-blue-500 mr-2">🏷️</span>
                  Category <span className="text-red-500 ml-1">*</span>
                </label>
                <input 
                  type="text" 
                  name="category" 
                  value={form.category} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g., Food, Salary, Transport"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none" 
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-blue-500 mr-2">📅</span>
                  Date <span className="text-red-500 ml-1">*</span>
                </label>
                <input 
                  type="date" 
                  name="date" 
                  value={form.date} 
                  onChange={handleChange} 
                  required 
                  placeholder="mm/dd/yyyy"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none" 
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <span className="text-blue-500 mr-2">📝</span>
                Description
              </label>
              <input 
                type="text" 
                name="description" 
                value={form.description} 
                onChange={handleChange} 
                placeholder="Short description (optional)"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none" 
              />
            </div>

            {/* Note */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <span className="text-blue-500 mr-2">📄</span>
                Note
              </label>
              <input 
                type="text" 
                name="note" 
                value={form.note} 
                onChange={handleChange} 
                placeholder="Additional notes (optional)"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none" 
              />
            </div>

            {/* Submit button */}
            <button 
              type="submit" 
              disabled={loading || !form.amount || !form.type || !form.category || !form.date} 
              className={`w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${loading ? 'cursor-wait' : ''}`}
            >
              {loading ? "Adding Transaction..." : "Add Transaction"}
            </button>

            {/* Success message at the bottom */}
            {success && (
              <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg text-center">
                <p className="text-green-700 font-semibold">{success}</p>
              </div>
            )}

            {/* Error message at the bottom */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <p className="text-red-700 font-medium text-center">{error}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}