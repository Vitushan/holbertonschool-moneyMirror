// Page d'ajout de transaction
// Permet à l'utilisateur de créer une nouvelle transaction (revenu ou dépense)
// Gère les devises traditionnelles et les cryptomonnaies

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MotivationalMessage from "@/components/MotivationalMessage";

export default function AddTransactionPage() {
  // État pour stocker les données du formulaire
  const [form, setForm] = useState({
    amount: "",           // Montant de la transaction
    type: "",             // Type: 'income' ou 'expense'
    category: "",         // Catégorie personnalisée
    description: "",      // Description optionnelle
    note: "",             // Note optionnelle
    currencyType: "currency",  // Type de devise: 'currency' ou 'cryptocurrency'
    currency: "EUR",      // Devise sélectionnée
    date: ""              // Date de la transaction
  });
  // État pour indiquer le chargement lors de la soumission
  const [loading, setLoading] = useState(false);
  // État pour les messages d'erreur
  const [error, setError] = useState("");
  // État pour les messages de succès
  const [success, setSuccess] = useState("");
  // État pour le type de transaction ajoutée (pour afficher le bon message)
  const [addedTransactionType, setAddedTransactionType] = useState(null);
  const router = useRouter();

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

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Gestion spéciale pour le changement de type de devise
    if (name === "currencyType") {
      setForm((prev) => ({
        ...prev,
        [name]: value,
        // Réinitialiser la devise selon le type sélectionné
        currency: value === "currency" ? "EUR" : "BTC"
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation du montant
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      setError("Le montant doit être un nombre valide supérieur à 0.");
      return;
    }

    // Validation de la date (pas de dates futures)
    const selectedDate = new Date(form.date);
    const today = new Date();
    if (selectedDate > today) {
      setError("Désolé, pas de voyage dans le futur !");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // Envoi de la requête POST à l'API
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
        }),
      });
      if (!res.ok) throw new Error("Échec de l'ajout de la transaction");

      // Définir le type de transaction pour afficher le bon message
      setAddedTransactionType(form.type);
      setSuccess("Transaction ajoutée avec succès !");

      // Réinitialisation du formulaire
      const previousType = form.type; // Garder le type pour l'affichage du message
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

      // Redirection après 3 secondes (pour laisser le temps de lire le message)
      setTimeout(() => router.push("/dashboard"), 3000);
    } catch (err) {
      setError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF] p-6">
      <div className="w-full max-w-2xl">
        {/* En-tête avec icône */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full mb-4 shadow-lg">
            <span className="text-4xl text-white font-bold">€</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Ajouter Transaction</h1>
          <p className="text-gray-600">Suivez vos revenus et dépenses</p>
        </div>

        {/* Carte de formulaire */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champ montant en haut */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <span className="text-blue-500 mr-2">€</span>
                Montant <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="amount"
                value={form.amount}
                onChange={(e) => {
                  const value = e.target.value.trim();
                  if (!isNaN(value) && parseFloat(value) > 0) {
                    handleChange(e);
                  }
                }}
                required
                placeholder="0.00"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
              />
            </div>

            {/* Grille Type de devise & Devise */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-blue-500 mr-2">💱</span>
                  Type de devise <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  name="currencyType"
                  value={form.currencyType}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-gray-700 outline-none"
                >
                  <option value="currency">💵 Devise</option>
                  <option value="cryptocurrency">₿ Cryptomonnaie</option>
                </select>
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-blue-500 mr-2">
                    {form.currencyType === "currency" ? "💰" : "₿"}
                  </span>
                  {form.currencyType === "currency" ? "Devise" : "Cryptomonnaie"} <span className="text-red-500 ml-1">*</span>
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
                <option value="">Sélectionner le type</option>
                <option value="income">💰 Revenu</option>
                <option value="expense">💸 Dépense</option>
              </select>
            </div>

            {/* Grille Catégorie & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-blue-500 mr-2">🏷️</span>
                  Catégorie <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  placeholder="ex : Nourriture, Salaire, Transport"
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
                  placeholder="jj/mm/aaaa"
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
                placeholder="Courte description (optionnel)"
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
                placeholder="Notes supplémentaires (optionnel)"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
              />
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={loading || !form.amount || !form.type || !form.category || !form.date}
              className={`w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${loading ? 'cursor-wait' : ''}`}
            >
              {loading ? "Ajout en cours..." : "Ajouter Transaction"}
            </button>

            {/* Message de succès avec message motivationnel contextuel */}
            {success && addedTransactionType && (
              <div className="mt-4 space-y-4">
                <div className="p-4 bg-green-100 border border-green-300 rounded-lg text-center">
                  <p className="text-green-700 font-semibold">{success}</p>
                </div>
                {/* Message motivationnel adapté au type de transaction */}
                <MotivationalMessage messageType={addedTransactionType} />
              </div>
            )}

            {/* Message d'erreur en bas */}
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