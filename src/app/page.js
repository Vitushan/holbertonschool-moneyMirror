// MoneyMirror - Main Landing Page (Minimal Version)
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">MoneyMirror</h1>
          <p className="text-lg mb-8">Application de gestion financière</p>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Projet en développement</h2>
            <p className="text-gray-600">Fonctionnalités développées dans les branches feature</p>
          </div>
        </div>
      </div>
    </div>
  )
}