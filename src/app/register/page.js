// Page d'inscription
// Permet aux nouveaux utilisateurs de créer un compte
// Valide les données et connecte automatiquement l'utilisateur vers le dashboard après succès

'use client'

import { useState, useEffect } from "react"
import { signIn } from "next-auth/react"

export default function Register() {
  // États pour stocker les données du formulaire
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // États pour la gestion des messages et du chargement
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Timestamp pour éviter les problèmes d'hydratation
  const [timestamp, setTimestamp] = useState(null);
  useEffect(() => {
    setTimestamp(Date.now());
  }, []);

  // Fonction pour gérer la soumission du formulaire d'inscription
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Vérifier que les mots de passe correspondent
      if (password !== confirmPassword) {
        throw new Error('Les mots de passe ne correspondent pas');
      }

      // Envoyer la requête d'inscription à l'API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Inscription réussie ! Connexion...');
        setMessageType('success');

        // Connecter automatiquement l'utilisateur
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false
        });

        if (result?.ok) {
          // Redirection manuelle vers le dashboard
          window.location.href = '/dashboard';
        } else {
          setMessage('Inscription réussie ! Veuillez vous connecter.');
          setMessageType('success');
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        }
      } else {
        setMessage(data.error || 'Échec de l\'inscription');
        setMessageType('error');
        setIsLoading(false);
      }
    } catch (error) {
      setMessage(error.message);
      setMessageType('error');
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">Inscription - MoneyMirror</h1>

      {/* Classes CSS dynamiques - Afficher le message seulement s'il existe */}
      {message && (
        <div className={(() => {
          let messageClasses;
          if (messageType === 'success') {
            messageClasses = `mb-4 p-4 rounded-lg bg-green-100 text-green-800 border border-green-300`;
          } else {
            messageClasses = `mb-4 p-4 rounded-lg bg-red-100 text-red-800 border border-red-300`;
          }
          return messageClasses;
        })()}>
          {message}
        </div>
      )}

      {/* Formulaire d'inscription */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">

        {/* Inputs contrôlés : valeur depuis l'état, onChange met à jour l'état */}
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded p-2"
          required
          autoComplete="username"
        />

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2"
          required
          autoComplete="email"
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-2"
          required
          autoComplete="new-password"
        />

        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border rounded p-2"
          required
          autoComplete="new-password"
        />

        {/* Bouton de soumission dynamique : désactivé pendant le chargement */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Chargement...' : 'S\'inscrire'}
        </button>
      </form>

      {/* Lien vers la page de connexion */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Vous avez déjà un compte ?{' '}
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Se connecter
          </a>
        </p>
      </div>
    </main>
  );
}
