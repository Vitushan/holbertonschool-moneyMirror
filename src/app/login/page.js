// Page de connexion
// Permet aux utilisateurs de se connecter avec leur email et mot de passe
// Redirige automatiquement si l'utilisateur est déjà connecté

'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'

export default function LoginPage() {
  // État pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  // État pour les messages de feedback
  const [message, setMessage] = useState('')
  // Type de message: 'success' ou 'error'
  const [messageType, setMessageType] = useState('')
  // État pour indiquer le chargement
  const [isLoading, setIsLoading] = useState(false)

  const { data: session, status } = useSession()
  const router = useRouter()

  // Si déjà connecté, afficher l'interface de connexion active
  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Déjà connecté !</h2>
            <p className="mt-2 text-gray-600">
              Bienvenue <strong>{session.user?.name || session.user?.email}</strong>
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Aller au tableau de bord
            </button>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Fonction pour gérer la soumission du formulaire de connexion
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    setMessageType('')

    try {
      // Tenter la connexion avec NextAuth
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      })

      if (result?.error) {
        setMessage('Email ou mot de passe incorrect')
        setMessageType('error')
      } else if (result?.ok) {
        setMessage('Connexion réussie ! Redirection...')
        setMessageType('success')
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error)
      setMessage('Une erreur s\'est produite. Veuillez réessayer.')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  // Classes CSS pour les messages de feedback
  const messageClasses = `mt-4 p-3 rounded-lg text-sm font-medium ${
    messageType === 'success'
      ? 'bg-green-100 text-green-800 border border-green-200'
      : messageType === 'error'
      ? 'bg-red-100 text-red-800 border border-red-200'
      : ''
  }`

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* En-tête avec logo */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <Logo />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Connexion</h2>
            <p className="mt-2 text-gray-600">
              Connectez-vous à votre compte MoneyMirror
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champ email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="votre@email.com"
              />
            </div>

            {/* Champ mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Votre mot de passe"
              />
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              } text-white`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion en cours...
                </span>
              ) : (
                'Se connecter'
              )}
            </button>

            {/* Message de feedback */}
            {message && (
              <div className={messageClasses}>
                {message}
              </div>
            )}
          </form>

          {/* Lien vers la page d'inscription */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Vous n'avez pas de compte ?{' '}
              <a
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Créer un compte
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
