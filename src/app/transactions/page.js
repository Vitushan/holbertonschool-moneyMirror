// Page de liste des transactions
// Affiche toutes les transactions de l'utilisateur avec possibilité de modifier et supprimer
// Route protégée, nécessite une authentification

"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Lazy loading du Modal (optimisation du bundle)
const Modal = dynamic(() => import("../../components/Modal"), { ssr: false });

export default function TransactionsPage() {
  // État pour stocker la liste des transactions
  const [transactions, setTransactions] = useState([]);
  // État pour le chargement initial
  const [loading, setLoading] = useState(true);
  // État pour les erreurs de récupération
  const [error, setError] = useState("");
  // État pour les erreurs de suppression
  const [deleteError, setDeleteError] = useState("");
  // État pour indiquer qu'une suppression est en cours
  const [isDeleting, setIsDeleting] = useState(false);
  // État pour indiquer qu'un rechargement est en cours
  const [isReloading, setIsReloading] = useState(false);
  // État pour contrôler l'affichage du modal de confirmation
  const [isModalOpen, setIsModalOpen] = useState(false);
  // État pour stocker l'ID de la transaction à supprimer
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const router = useRouter();
  // État pour le solde total (revenus - dépenses)
  const [balance, setBalance] = useState(0);

  // Récupérer les transactions au chargement de la page
  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/transactions");
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Vous devez être connecté pour voir vos transactions.");
          } else if (res.status === 404) {
            throw new Error("Transactions introuvables (404)");
          } else if (res.status === 500) {
            throw new Error("Erreur serveur (500)");
          } else {
            throw new Error("Erreur lors de la récupération des transactions");
          }
        }
        const data = await res.json();
        setTransactions(data.transactions || []);
        setBalance(calculateBalance(data.transactions || []));
      } catch (err) {
        setError(err.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  // Fonction pour calculer le solde total (revenus - dépenses) - mémoïsée avec useCallback
  const calculateBalance = useCallback((transactions) => {
    return transactions.reduce((total, transaction) => {
      return transaction.type === "income"
        ? total + transaction.amount
        : total - transaction.amount;
    }, 0);
  }, []);

  // Calcul des revenus et dépenses séparément - mémoïsé avec useMemo pour éviter recalculs
  const { income, expenses } = useMemo(() => {
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
  }, [transactions]);

  // Fonction pour formater les montants en euros - mémoïsée avec useCallback
  const formatAmount = useCallback((amount) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  }, []);

  // Fonction pour ouvrir le modal de confirmation de suppression - mémoïsée avec useCallback
  const openModal = useCallback((id) => {
    setTransactionToDelete(id);
    setIsModalOpen(true);
  }, []);

  // Fonction pour fermer le modal de confirmation - mémoïsée avec useCallback
  const closeModal = useCallback(() => {
    setTransactionToDelete(null);
    setIsModalOpen(false);
  }, []);

  // Fonction pour recharger la liste des transactions après modification - mémoïsée avec useCallback
  const reloadTransactions = useCallback(async () => {
    setIsReloading(true);
    try {
      const updatedRes = await fetch("/api/transactions");
      if (!updatedRes.ok) throw new Error("Échec de la récupération des transactions mises à jour");
      const updatedData = await updatedRes.json();
      setTransactions(updatedData.transactions || []);
    } catch (err) {
      setError(err.message || "Une erreur inattendue s'est produite lors du rechargement des transactions");
    } finally {
      setIsReloading(false);
    }
  }, []);

  // Fonction pour confirmer et exécuter la suppression d'une transaction - mémoïsée avec useCallback
  const confirmDelete = useCallback(async () => {
    if (!transactionToDelete) return;

    setDeleteError("");
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/transactions/${transactionToDelete}`, { method: "DELETE" });
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Transaction introuvable (404)");
        } else if (res.status === 500) {
          throw new Error("Erreur serveur (500)");
        } else {
          throw new Error("Échec de la suppression de la transaction");
        }
      }

      await reloadTransactions();
    } catch (err) {
      setDeleteError(err.message || "Une erreur inattendue s'est produite lors de la suppression");
    } finally {
      setIsDeleting(false);
      closeModal();
      setTimeout(() => setDeleteError(""), 5000);
    }
  }, [transactionToDelete, reloadTransactions, closeModal]);

  // Fonction pour naviguer vers la page de modification d'une transaction - mémoïsée avec useCallback
  const handleEdit = useCallback(async (id) => {
    if (!id) {
      console.error("ID de transaction invalide");
      return;
    }
    try {
      router.push(`/transactions/edit/${id}`);
    } catch (err) {
      console.error("Échec de la navigation vers la page de modification", err);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF]">
        <div className="text-lg text-blue-600 font-medium">Chargement...</div>
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
        <div className="text-lg text-blue-600 font-medium">Traitement...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-6xl bg-white shadow rounded-lg overflow-x-auto p-6">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h1 className="text-3xl font-bold">Liste des Transactions</h1>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Tableau de bord
              </button>
              <button
                onClick={() => router.push('/transactions/add')}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Ajouter Transaction
              </button>
            </div>
          </div>
        <div className="p-4 border border-gray-300 rounded-md mb-8 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Total Revenus :</span>
            <span className="text-sm font-bold text-green-600">{formatAmount(income)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Total Dépenses :</span>
            <span className="text-sm font-bold text-red-600">{formatAmount(expenses)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Solde Total :</span>
            <span className="text-sm font-bold text-blue-900">{formatAmount(balance)}</span>
          </div>
        </div>
        {deleteError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
            <p className="text-red-700 font-medium text-center">{deleteError}</p>
          </div>
        )}
        <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Catégorie</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Montant</th>
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
                    <p className="text-gray-500 text-lg font-medium">Aucune transaction trouvée</p>
                    <p className="text-gray-400 text-sm mt-2">Commencez par ajouter votre première transaction !</p>
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
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(transaction.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors font-medium text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Modifier
                      </button>
                      <button
                        onClick={() => openModal(transaction.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors font-medium text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
        {isModalOpen && (
          <Modal onClose={closeModal} onConfirm={confirmDelete}>
            <p>Êtes-vous sûr de vouloir supprimer cette transaction ?</p>
          </Modal>
        )}
        </div>
      </div>
    </div>
  );
}