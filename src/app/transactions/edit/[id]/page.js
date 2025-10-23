// Page de modification de transaction
// Permet à l'utilisateur de modifier une transaction existante
// Récupère les données depuis l'API et les affiche dans le formulaire

"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditTransaction() {
  const router = useRouter();
  const { id } = useParams();  // Récupérer l'ID de la transaction depuis l'URL

  // État pour stocker les données du formulaire
  const [form, setForm] = useState({
    amount: "",           // Montant de la transaction
    type: "income",       // Type: 'income' ou 'expense'
    category: "",         // Catégorie
    date: "",             // Date de la transaction
    currencyType: "currency",  // Type de devise
    currency: "EUR",      // Devise sélectionnée
    description: "",      // Description optionnelle
    note: "",             // Note optionnelle
  });
  // État pour indiquer le chargement des données
  const [loading, setLoading] = useState(true);
  // État pour indiquer l'enregistrement lors de la soumission
  const [saving, setSaving] = useState(false);
  // État pour les messages d'erreur
  const [error, setError] = useState("");
  // État pour les messages de succès
  const [success, setSuccess] = useState("");

  // Liste des devises traditionnelles disponibles
  const currencies = [
    { value: "EUR", label: "🇪🇺 EUR - Euro" },
    { value: "USD", label: "🇺🇸 USD - Dollar US" },
    { value: "GBP", label: "🇬🇧 GBP - Livre Sterling" },
    { value: "CHF", label: "🇨🇭 CHF - Franc Suisse" },
    { value: "JPY", label: "🇯🇵 JPY - Yen" },
    { value: "CAD", label: "🇨🇦 CAD - Dollar Canadien" },
    { value: "AUD", label: "🇦🇺 AUD - Dollar Australien" }
  ];

  // Liste des cryptomonnaies disponibles
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

  // Récupérer les données de la transaction au chargement de la page
  useEffect(() => {
    const fetchTransaction = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/transactions/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("La transaction n'existe pas ou a été supprimée.");
          } else {
            throw new Error("Erreur lors de la récupération de la transaction.");
          }
        }
        const data = await res.json();
        const transaction = data.transaction; // L'API retourne { success: true, transaction }

        // Remplir le formulaire avec les données récupérées
        setForm({
          amount: transaction.amount || "",
          type: transaction.type || "income",
          category: transaction.category || "",
          description: transaction.description || "",
          note: transaction.note || "",
          currencyType: transaction.currencyType || "currency",
          currency: transaction.currency || "EUR",
          date: transaction.date ? transaction.date.split('T')[0] : ""  // Formater la date pour l'input date
        });
      } catch (err) {
        setError(err.message || "Erreur inconnue.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTransaction();
    }
  }, [id]);

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation du montant
    if (!form.amount) {
        setError("Le montant est requis.");
        return;
    }
    // Validation du type
    if (!form.type || (form.type !== "income" && form.type !== "expense")) {
        setError("Le type est requis.");
        return;
    }
    // Validation de la catégorie
    if (!form.category) {
        setError("La catégorie est requise.");
        return;
    }
    // Validation de la date
    if (!form.date) {
        setError("La date est requise.");
        return;
    }

    // Vérifier que le montant est un nombre valide
    if (isNaN(form.amount) || Number(form.amount) <= 0) {
        setError("Le montant doit être un nombre valide supérieur à 0.");
        return;
    }

    // Vérifier que la date n'est pas dans le futur
    const selectedDate = new Date(form.date);
    const today = new Date();
    if (selectedDate > today) {
        setError("Désolé, la date ne peut pas être dans le futur !");
        return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      // Envoyer la requête PUT pour mettre à jour la transaction
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour de la transaction !");

      setSuccess("Transaction mise à jour avec succès !");
      // Redirection vers la liste des transactions après 1.5 seconde
      setTimeout(() => router.push("/transactions"), 1500);
    } catch (err) {
      setError(err.message || "Erreur inconnue");
    } finally {
      setSaving(false);
    }
  };

  // Affichage pendant le chargement des données
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF]">
        <div className="text-lg text-blue-600 font-medium">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF] p-6">
      <div className="w-full max-w-2xl">
        {/* En-tête avec icône */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full mb-4 shadow-lg">
            <span className="text-4xl text-white font-bold">✏️</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Modifier Transaction</h1>
          <p className="text-gray-600">Mettez à jour les détails de votre transaction</p>
        </div>

        {/* Carte de formulaire */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Message de succès */}
          {success && (
            <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-lg text-center">
              <p className="text-green-700 font-semibold">{success}</p>
            </div>
          )}

          {/* Message d'erreur */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-red-700 font-medium text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champ montant */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Montant</label>
              <input
                type="text"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
              />
            </div>

            {/* Type de devise */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Type de devise</label>
              <select
                name="currencyType"
                value={form.currencyType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-gray-700 outline-none"
              >
                <option value="currency">Devise</option>
                <option value="cryptocurrency">Cryptomonnaie</option>
              </select>
            </div>

            {/* Devise */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {form.currencyType === "currency" ? "Devise" : "Cryptomonnaie"}
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
                <option value="income">Revenu</option>
                <option value="expense">Dépense</option>
              </select>
            </div>

            {/* Catégorie */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie</label>
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
                max={new Date().toISOString().split('T')[0]}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none cursor-text"
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 Cliquez sur l'icône 📅 pour le calendrier ou tapez directement la date
              </p>
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

            {/* Boutons d'action */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.push("/transactions")}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg hover:bg-gray-300 transition font-semibold text-lg"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Mise à jour..." : "Mettre à jour"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
