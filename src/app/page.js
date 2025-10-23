// Page d'accueil de MoneyMirror
// Redirige automatiquement vers le dashboard si connecté, sinon vers login

'use client'

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Si la session est chargée
    if (status === 'loading') return;

    // Rediriger selon l'état de connexion
    if (session) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [session, status, router]);

  // Afficher un loader pendant la vérification
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">MoneyMirror</h1>
        <p className="text-gray-600">Chargement...</p>
      </div>
    </div>
  )
}
