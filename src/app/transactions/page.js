//Transactions List Page with edit/delete action and connect API

'use client' //tells Next.js that this component is client-side (React)
import { useEffect, useState } from "react" //manage state and side effects (fetch API, etc.) [useEffect for start fetch)]


export default function TransactionsPage() { //transactions lists
    const [transactions, setTransactions] = useState([]) // will contain the list of transactions retrieved from the API
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
}
