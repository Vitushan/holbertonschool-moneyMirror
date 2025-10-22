'use client'

export default function Logo({ size = 'default' }) {
  const sizes = {
    small: 'h-8',
    default: 'h-10',
    large: 'h-12'
  }

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizes[size]} aspect-square bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300`}>
        <svg
          className="w-3/5 h-3/5 text-white drop-shadow-lg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className="font-bold text-gray-900 text-xl leading-none">
          Money<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Mirror</span>
        </span>
        <span className="text-xs text-gray-500 leading-none mt-1">
          Suivez vos finances
        </span>
      </div>
    </div>
  )
}
