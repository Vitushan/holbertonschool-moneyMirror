// Page d'accueil de MoneyMirror
// Point d'entrée principal de l'application

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">MoneyMirror</h1>
          <p className="text-lg mb-8">Application de gestion financière</p>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Statut de l'API</h2>
            <p>API d'authentification disponible sur /api/auth/register</p>
          </div>
        </div>
      </div>
    </div>
  )
}
