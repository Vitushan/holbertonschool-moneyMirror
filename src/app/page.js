import Link from 'next/link'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            MoneyMirror
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Simplifiez la gestion de vos finances personnelles. Suivez, organisez 
            et analysez vos revenus et dépenses avec une interface intuitive et sécurisée.
          </p>
          
          <div className="flex justify-center space-x-4 mb-12">
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-200"
            >
              Se connecter
            </Link>
            <Link
              href="/register"
              className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-3 rounded-lg font-semibold border border-blue-600 transition duration-200"
            >
              S'inscrire
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-blue-600 text-3xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Suivi des transactions</h3>
              <p className="text-gray-600">
                Ajoutez, modifiez et visualisez facilement tous vos revenus et dépenses.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-blue-600 text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Analyses visuelles</h3>
              <p className="text-gray-600">
                Graphiques interactifs pour comprendre vos habitudes de dépenses.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-blue-600 text-3xl mb-4">💡</div>
              <h3 className="text-xl font-semibold mb-2">Conseils financiers</h3>
              <p className="text-gray-600">
                Recevez des conseils personnalisés pour mieux gérer votre budget.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}