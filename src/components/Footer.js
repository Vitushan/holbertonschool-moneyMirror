'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Logo and tagline */}
          <div className="flex items-center gap-2">
            <div className="h-8 aspect-square bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center shadow">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <span className="font-bold text-gray-900">
                Money<span className="text-green-600">Mirror</span>
              </span>
              <p className="text-xs text-gray-500">Votre compagnon financier</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              © {currentYear} MoneyMirror. Tous droits réservés.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Réalisé par Vithushan
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
