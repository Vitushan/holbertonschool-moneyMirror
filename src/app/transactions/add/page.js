// Add Transaction form (API connected)

"use client"
import { Euro, Calendar, Tag, FileText, Coins } from "lucide-react";
import { useState } from "react" // manage form state, loading, error and success messages


export default function AddTransactionPage() {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) { // Handle add transaction form submission
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);

        const form = e.target;
        const data = {
            amount: Number(form.amount.value), // conversion to number required for API
            type: form.type.value,
            category: form.category.value,
            description: form.description.value,
            note: form.note.value,
            currency: form.currency.value,
            date: form.date.value,
        };

        try {
            const res = await fetch("/api/transactions", { // Send POST request to API to add the transaction (res = response)
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include",
            });
            if (!res.ok) {
                const err = await res.json();
                setError(err.error || err.message || "Failed to add transaction")
            } else {
                setMessage("Transaction successfully added!");
                form.reset();
            }
        } catch (err) {
            setError("Network or server error")
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-blue-500 p-3 rounded-full">
                            <Euro size={32} color="white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Add Transaction</h1>
                    <p className="text-gray-600 mt-2">Track your income and expenses</p>
                </div>

                {/* Form Card */}
                <div className="card">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Amount & Currency Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2">
                                <label htmlFor="amount" className="label flex items-center gap-2 mb-2">
                                    <Coins size={16} className="text-blue-500" />
                                    Amount *
                                </label>
                                <input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    name="amount"
                                    placeholder="0.00"
                                    className="input-field"
                                    required />
                            </div>
                            <div>
                                <label htmlFor="currency" className="label flex items-center gap-2 mb-2">
                                    <Coins size={16} className="text-blue-500" />
                                    Currency *
                                </label>
                                <select
                                    id="currency"
                                    name="currency"
                                    defaultValue="EUR"
                                    className="input-field"
                                    required >

                                    {/* Fiat Currencies Group */}
                                    <optgroup label="💵 Fiat Currencies">
                                        <option value="EUR">€ EUR (Euro)</option>
                                        <option value="USD">$ USD (Dollar)</option>
                                        <option value="GBP">£ GBP (Pound)</option>
                                        <option value="JPY">¥ JPY (Yen)</option>
                                        <option value="CHF">CHF (Franc)</option>
                                        <option value="CAD">$ CAD (Canadian Dollar)</option>
                                        <option value="AUD">$ AUD (Australian Dollar)</option>
                                        <option value="CNY">¥ CNY (Yuan)</option>
                                        <option value="INR">₹ INR (Rupee)</option>
                                        <option value="BRL">R$ BRL (Real)</option>
                                        <option value="ZAR">R ZAR (Rand)</option>
                                        <option value="RUB">₽ RUB (Ruble)</option>
                                        <option value="THB">฿ THB (Baht)</option>
                                        <option value="MXN">$ MXN (Peso)</option>
                                        <option value="SEK">kr SEK (Krona)</option>
                                    </optgroup>

                                    {/* Cryptocurrencies Group */}
                                    <optgroup label="₿ Cryptocurrencies">
                                        <option value="BTC">₿ BTC (Bitcoin)</option>
                                        <option value="ETH">Ξ ETH (Ethereum)</option>
                                        <option value="USDT">₮ USDT (Tether)</option>
                                        <option value="BNB">🔸 BNB (Binance Coin)</option>
                                        <option value="XRP">✕ XRP (Ripple)</option>
                                        <option value="ADA">₳ ADA (Cardano)</option>
                                        <option value="SOL">◎ SOL (Solana)</option>
                                        <option value="DOGE">Ð DOGE (Dogecoin)</option>
                                    </optgroup>
                                </select>
                            </div>
                        </div>

                        {/* Type */}
                        <div>
                            <label htmlFor="type" className="label mb-2 block">
                                Type *
                            </label>
                            <select id="type" name="type" className="input-field" required defaultValue="">
                                <option value="" disabled> ⚖️ Select type ⚖️ </option>
                                <option value="income">💰 Income</option>
                                <option value="expense">💸 Expense</option>
                            </select>
                        </div>

                        {/* Category & Date Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="category" className="label flex items-center gap-2 mb-2">
                                    <Tag size={16} className="text-blue-500" />
                                    Category *
                                </label>
                                <input
                                    id="category"
                                    type="text"
                                    name="category"
                                    placeholder="ex: Food, Salary, Transport"
                                    className="input-field"
                                    required />
                            </div>
                            <div>
                                <label htmlFor="date" className="label flex items-center gap-2 mb-2">
                                    <Calendar size={16} className="text-blue-500" />
                                    Date *
                                </label>
                                <input
                                    id="date"
                                    type="date"
                                    name="date"
                                    className="input-field"
                                    required />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="label flex items-center gap-2 mb-2">
                                <FileText size={16} className="text-blue-500" />
                                Description
                            </label>
                            <input
                                id="description"
                                type="text"
                                name="description"
                                placeholder="Short description (optional)"
                                className="input-field" />
                        </div>

                        {/* Note */}
                        <div>
                            <label htmlFor="note" className="label flex items-center gap-2 mb-2">
                                <FileText size={16} className="text-blue-500" />
                                Note
                            </label>
                            <textarea
                                id="note"
                                name="note"
                                rows="3"
                                placeholder="Additional notes (optional)"
                                className="input-field resize-none" />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? "Adding..." : "Add Transaction"}
                        </button>
                    </form>

                    {/* Success/Error Messages */}
                    {message && (
                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-green-700 font-medium text-center">{message}</p>
                        </div>
                    )}
                    {error && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 font-medium text-center">{error}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}