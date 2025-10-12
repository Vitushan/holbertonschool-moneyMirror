// Add Transaction form (API connected)

"use client"
import { Currency } from "lucide-react";
import { useState } from "react"


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
            setError(err.error || err.message || "Add Error")
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
        <div>
            <h1>
                <Currency size={24} color="#007bff" style={{ verticalAlign: "middle"}} /> Add Transaction
            </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input id="amount" type="number" name="amount" required />
                </div>
                <div>
                    <label htmlFor="type">Type:</label>
                    <select id="type" name="type" required>
                        <option value="">Select</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <input id="category" type="text" name="category" required />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input id="description" type="text" name="description" />
                </div>
                <div>
                    <label htmlFor="note">Note:</label>
                    <input id="note" type="text" name="note" />
                </div>
                <div>
                    <label htmlFor="currency">Currency:</label>
                    <input id="currency" type="text" name="currency" defaultValue="EUR" required />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input id="date" type="date" name="date" required />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Adding in progress...": "Add"}
                </button>
            </form>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
     );
}