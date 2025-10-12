//form add transactions

export default function AddTransactionPage() {
    return (
        <div>
            <h1>Add Transaction</h1>
            <form>
                <div>
                    <label>Amount:</label>
                    <input type="number" name="amount" required />
                </div>
                <div>
                    <label>Type:</label>
                    <select name="type" required>
                        <option value="">--Select--</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div>
                        <label>Category:</label>
                        <input type="text" name="category" required />
                </div>
                <div>
                        <label>Description:</label>
                        <input type="text" name="description" />
                </div>
                <div>
                        <label>Note:</label>
                        <input type="text" name="note" />
                </div>
                <div>
                        <label>Currency:</label>
                        <input type="text" name="currency" defaultValue="EUR" required />
                </div>
                <div>
                        <label>Date:</label>
                        <input type="date" name="date" required />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
     )
}