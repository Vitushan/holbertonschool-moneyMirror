// Page de donation pour soutenir MoneyMirror
// Présente les différents moyens de soutenir le projet
// 15% des revenus sont reversés à une association caritative

'use client'

import { useState } from 'react'

export default function DonationPage() {
  const [donationType, setDonationType] = useState('unique') // 'unique', 'monthly', 'yearly'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Section Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Soutenez MoneyMirror 💙</h1>
          <p className="text-xl mb-4">
            Aidez-nous à améliorer l'application et à soutenir une noble cause
          </p>
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            <p className="text-lg font-semibold">
              🎁 15% des revenus reversés à une association caritative
            </p>
          </div>
        </div>
      </div>

      {/* Section Storytelling */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-xl p-8 mb-16 border-2 border-blue-200">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">💭</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mon Histoire</h2>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Salut, je suis <span className="font-bold text-blue-600">Vithushan</span>, l'unique développeur derrière MoneyMirror.
              Comme beaucoup d'entre vous, j'ai longtemps eu du mal à gérer mes finances personnelles. Entre les dépenses imprévues,
              les oublis de transactions et le manque de vision claire sur mon budget, je me sentais perdu.
            </p>
            <p>
              Un jour, après avoir dépassé mon budget mensuel pour la troisième fois d'affilée, je me suis dit : <span className="italic">"Il doit y avoir une meilleure façon de faire." </span> C'est à ce moment que l'idée de MoneyMirror est née.
            </p>
            <p>
              J'ai passé des centaines d'heures à créer cette application, non pas pour devenir riche, mais pour aider les gens
              comme moi à reprendre le contrôle de leurs finances. Chaque ligne de code a été écrite avec passion et le désir sincère
              de faire une différence.
            </p>
            <p className="font-semibold text-blue-700">
              Aujourd'hui, MoneyMirror est gratuit et le restera toujours. Mais si vous trouvez de la valeur dans ce projet
              et souhaitez m'aider à le maintenir et à l'améliorer, votre soutien serait incroyablement précieux.
              Et ensemble, nous pouvons aussi aider ceux qui en ont le plus besoin. 🤝
            </p>
          </div>
        </div>
      </div>

      {/* Section Mission */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Pourquoi nous soutenir */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Pourquoi soutenir MoneyMirror ?
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Développement de nouvelles fonctionnalités</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Maintenance et amélioration continue</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Support utilisateur gratuit</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Application 100% sans publicité</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Hébergement et infrastructure sécurisée</span>
              </li>
            </ul>
          </div>

          {/* Impact social */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-xl p-8 border-2 border-orange-200">
            <div className="text-4xl mb-4">❤️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Votre impact social
            </h2>
            <div className="bg-white rounded-xl p-6 mb-4">
              <p className="text-3xl font-bold text-orange-600 mb-2">15%</p>
              <p className="text-gray-700 font-semibold">
                de chaque don est reversé à une association
              </p>
            </div>

            {/* Déduction fiscale */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-4 border-2 border-green-300">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">💰</span>
                <div>
                  <p className="text-xl font-bold text-green-700">
                    66% de votre don déductible des impôts
                  </p>
                  <p className="text-sm text-gray-600">
                    (En France, selon l'article 200 du CGI)
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 mt-3">
                <p className="text-gray-700 font-semibold mb-2">📊 Exemple concret :</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Don de 100€</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-gray-600">Déduction de 66€</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-green-700 font-bold">Coût réel : 34€</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 italic">
                📋 Un reçu fiscal vous sera automatiquement envoyé par email
              </p>
            </div>

            <p className="text-gray-700 mb-4">
              Nous soutenons des associations œuvrant pour :
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="text-2xl mr-2">🏠</span>
                <span>Orphelinats et aide à l'enfance</span>
              </li>
              <li className="flex items-center">
                <span className="text-2xl mr-2">👴</span>
                <span>Maisons de retraite et personnes âgées</span>
              </li>
            </ul>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 mt-6 border-l-4 border-orange-400">
              <p className="text-gray-800 leading-relaxed italic">
                💫 <span className="font-semibold text-orange-700">Le karma n'oublie jamais les bonnes actions.</span> Chaque don est une graine de bonté qui fleurit bien au-delà de ce que vous pouvez imaginer. En soutenant MoneyMirror, vous aidez non seulement le projet, mais aussi des enfants, des personnes âgées. C'est ça, être utile dans ce bas monde : créer une chaîne d'amour et de solidarité.
              </p>
            </div>
          </div>
        </div>

        {/* Section Options de don */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Choisissez votre façon de nous aider
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Tous les dons font la différence, quelle que soit leur forme 💙
          </p>

          {/* Onglets */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-xl bg-gray-100 p-1">
              <button
                onClick={() => setDonationType('unique')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  donationType === 'unique'
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Don unique
              </button>
              <button
                onClick={() => setDonationType('monthly')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  donationType === 'monthly'
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Mensuel
              </button>
              <button
                onClick={() => setDonationType('yearly')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all relative ${
                  donationType === 'yearly'
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Annuel
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full">
                  ⭐ -17%
                </span>
              </button>
            </div>
          </div>

          {/* Montants selon le type */}
          {donationType === 'unique' && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <button className="bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-2 border-blue-300 rounded-xl p-6 text-center transition-all hover:scale-105 hover:shadow-lg">
                  <p className="text-3xl font-bold text-blue-600 mb-1">5€</p>
                  <p className="text-sm text-gray-600">Un café ☕</p>
                </button>
                <button className="bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-2 border-blue-300 rounded-xl p-6 text-center transition-all hover:scale-105 hover:shadow-lg">
                  <p className="text-3xl font-bold text-blue-600 mb-1">10€</p>
                  <p className="text-sm text-gray-600">Déjeuner 🍽️</p>
                </button>
                <button className="bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-2 border-green-300 rounded-xl p-6 text-center transition-all hover:scale-105 hover:shadow-lg">
                  <p className="text-3xl font-bold text-green-600 mb-1">25€</p>
                  <p className="text-sm text-gray-600">Généreux 🌟</p>
                </button>
                <button className="bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-2 border-green-300 rounded-xl p-6 text-center transition-all hover:scale-105 hover:shadow-lg">
                  <p className="text-3xl font-bold text-green-600 mb-1">50€</p>
                  <p className="text-sm text-gray-600">Supporter 🚀</p>
                </button>
              </div>
              <div className="text-center">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all">
                  💰 Montant personnalisé
                </button>
              </div>
            </div>
          )}

          {donationType === 'monthly' && (
            <div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-blue-800 text-center">
                  💡 <span className="font-semibold">Un don récurrent</span> nous permet de planifier le développement sur le long terme. Vous pouvez annuler à tout moment, sans engagement.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <button className="bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-2 border-blue-300 rounded-xl p-6 text-center transition-all hover:scale-105 hover:shadow-lg">
                  <p className="text-3xl font-bold text-blue-600 mb-1">2€</p>
                  <p className="text-sm text-gray-600 mb-2">par mois</p>
                  <p className="text-xs text-gray-500">≈ 24€ par an</p>
                </button>
                <button className="bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border-2 border-purple-300 rounded-xl p-6 text-center transition-all hover:scale-105 hover:shadow-lg relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-xs px-3 py-1 rounded-full">
                    Populaire
                  </div>
                  <p className="text-3xl font-bold text-purple-600 mb-1">5€</p>
                  <p className="text-sm text-gray-600 mb-2">par mois</p>
                  <p className="text-xs text-gray-500">≈ 60€ par an</p>
                </button>
                <button className="bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-2 border-green-300 rounded-xl p-6 text-center transition-all hover:scale-105 hover:shadow-lg">
                  <p className="text-3xl font-bold text-green-600 mb-1">10€</p>
                  <p className="text-sm text-gray-600 mb-2">par mois</p>
                  <p className="text-xs text-gray-500">≈ 120€ par an</p>
                </button>
              </div>
              <div className="text-center">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all">
                  💰 Montant personnalisé
                </button>
              </div>
            </div>
          )}

          {donationType === 'yearly' && (
            <div>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4 mb-6">
                <p className="text-orange-800 text-center">
                  ⭐ <span className="font-semibold">Le don annuel vous fait économiser l'équivalent de 2 mois !</span> C'est le meilleur rapport qualité-prix pour soutenir MoneyMirror sur le long terme.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <button className="bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-2 border-blue-300 rounded-xl p-6 text-center transition-all hover:scale-105 hover:shadow-lg">
                  <p className="text-3xl font-bold text-blue-600 mb-1">20€</p>
                  <p className="text-sm text-gray-600 mb-2">par an</p>
                  <div className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full inline-block">
                    💰 Économisez 4€
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Au lieu de 24€</p>
                </button>
                <button className="bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border-2 border-purple-300 rounded-xl p-6 text-center transition-all hover:scale-105 hover:shadow-lg relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full">
                    Meilleur choix
                  </div>
                  <p className="text-3xl font-bold text-purple-600 mb-1">50€</p>
                  <p className="text-sm text-gray-600 mb-2">par an</p>
                  <div className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full inline-block">
                    💰 Économisez 10€
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Au lieu de 60€</p>
                </button>
                <button className="bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-2 border-green-300 rounded-xl p-6 text-center transition-all hover:scale-105 hover:shadow-lg">
                  <p className="text-3xl font-bold text-green-600 mb-1">100€</p>
                  <p className="text-sm text-gray-600 mb-2">par an</p>
                  <div className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full inline-block">
                    💰 Économisez 20€
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Au lieu de 120€</p>
                </button>
              </div>
              <div className="text-center">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all">
                  💰 Montant personnalisé
                </button>
              </div>
            </div>
          )}

          {/* Message sur l'email de remerciement */}
          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💌</div>
              <div>
                <p className="text-gray-800 font-semibold mb-2">
                  Vous recevrez un email de remerciement personnalisé
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Après votre don, vous recevrez un email de ma part avec mes sincères remerciements,
                  ainsi qu'un <span className="font-semibold text-green-700">rapport de transparence</span> détaillant
                  comment votre contribution aide MoneyMirror et les associations que nous soutenons.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Moyens de paiement */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Choisissez votre moyen de paiement
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* PayPal */}
            <div className="border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105">
              <div className="text-4xl mb-3 text-center">💳</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">PayPal</h3>
              <p className="text-gray-600 text-sm mb-4 text-center">Paiement sécurisé par carte ou compte PayPal</p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
                Don via PayPal
              </button>
            </div>

            {/* Carte bancaire (Stripe) */}
            <div className="border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105">
              <div className="text-4xl mb-3 text-center">💳</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Carte Bancaire</h3>
              <p className="text-gray-600 text-sm mb-4 text-center">Visa, Mastercard, American Express</p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition">
                Don par carte
              </button>
            </div>

          {/* Usdt */}
            <div className="border-2 border-orange-200 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105">
              <div className="text-4xl mb-3 text-center">$</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Usdt</h3>
              <p className="text-gray-600 text-sm mb-4 text-center">Paiement en Usdt</p>
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition">
                Don en Usdt
              </button>
            </div>

            {/* Bitcoin */}
            <div className="border-2 border-orange-200 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105">
              <div className="text-4xl mb-3 text-center">₿</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Bitcoin</h3>
              <p className="text-gray-600 text-sm mb-4 text-center">Paiement en BTC</p>
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition">
                Don en Bitcoin
              </button>
            </div>

            {/* Ethereum */}
            <div className="border-2 border-indigo-200 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105">
              <div className="text-4xl mb-3 text-center">Ξ</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Ethereum</h3>
              <p className="text-gray-600 text-sm mb-4 text-center">Paiement en ETH</p>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition">
                Don en Ethereum
              </button>
            </div>

            {/* Wise */}
            <div className="border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105">
              <div className="text-4xl mb-3 text-center">🌍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Wise</h3>
              <p className="text-gray-600 text-sm mb-4 text-center">Transfert international</p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition">
                Don via Wise
              </button>
            </div>

            {/* Virement bancaire */}
            <div className="border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105">
              <div className="text-4xl mb-3 text-center">🏦</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Virement</h3>
              <p className="text-gray-600 text-sm mb-4 text-center">Virement bancaire classique</p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
                Infos virement
              </button>
            </div>

            {/* Paysafecard */}
            <div className="border-2 border-red-200 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105">
              <div className="text-4xl mb-3 text-center">🎫</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Paysafecard</h3>
              <p className="text-gray-600 text-sm mb-4 text-center">Code prépayé PIN</p>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition">
                Don avec Paysafecard
              </button>
            </div>

            {/* PCS Mastercard */}
            <div className="border-2 border-blue-300 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105">
              <div className="text-4xl mb-3 text-center">💳</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">PCS Mastercard</h3>
              <p className="text-gray-600 text-sm mb-4 text-center">Carte prépayée rechargeable</p>
              <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition">
                Don avec PCS
              </button>
            </div>

            {/* Western Union */}
            <div className="border-2 border-yellow-200 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105">
              <div className="text-4xl mb-3 text-center">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Western Union</h3>
              <p className="text-gray-600 text-sm mb-4 text-center">Transfert d'argent</p>
              <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-lg transition">
                Don via Western Union
              </button>
            </div>

            {/* Revolut */}
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105">
              <div className="text-4xl mb-3 text-center">💸</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Revolut</h3>
              <p className="text-gray-600 text-sm mb-4 text-center">Paiement instantané</p>
              <button className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-lg transition">
                Don via Revolut
              </button>
            </div>
          </div>
        </div>

        {/* Transparence améliorée */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-green-500 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="text-3xl mr-3">📊</span>
            Transparence totale
          </h2>

          <div className="space-y-3 text-gray-700 mb-6">
            <p className="flex items-start">
              <span className="text-green-500 text-xl mr-2">✓</span>
              <span>85% des dons servent au développement et à la maintenance de MoneyMirror</span>
            </p>
            <p className="flex items-start">
              <span className="text-green-500 text-xl mr-2">✓</span>
              <span>15% sont reversés à des associations caritatives (orphelinats, maisons de retraite)</span>
            </p>
            <p className="flex items-start">
              <span className="text-green-500 text-xl mr-2">✓</span>
              <span>Un rapport mensuel de transparence est envoyé à tous les donateurs</span>
            </p>
            <p className="flex items-start">
              <span className="text-green-500 text-xl mr-2">✓</span>
              <span>Tous les reçus de dons aux associations sont rendus publics</span>
            </p>
          </div>

          {/* Exemple de versements (mockup) */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border-2 border-blue-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📁</span>
              Derniers versements aux associations
            </h3>

            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏠</span>
                    <div>
                      <p className="font-semibold text-gray-900">Orphelinat Saint-Vincent</p>
                      <p className="text-sm text-gray-500">15 mars 2025</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">127€</p>
                    <button className="text-xs text-blue-600 hover:underline">📄 Voir le reçu</button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👴</span>
                    <div>
                      <p className="font-semibold text-gray-900">Maison de Retraite Les Oliviers</p>
                      <p className="text-sm text-gray-500">15 mars 2025</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">98€</p>
                    <button className="text-xs text-blue-600 hover:underline">📄 Voir le reçu</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline">
                📂 Voir tous les rapports de transparence →
              </button>
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              💡 <span className="font-semibold">Engagement de transparence :</span> Chaque trimestre, un rapport détaillé est publié avec les montants collectés,
              l'utilisation des fonds, et les preuves de versements aux associations. Votre confiance est notre priorité.
            </p>
          </div>
        </div>

        {/* Message de remerciement chaleureux */}
        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-2xl shadow-2xl p-10 mt-12 border-2 border-purple-200">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🙏</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Un immense MERCI !
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4 text-gray-700 leading-relaxed text-center">
            <p className="text-lg">
              Que vous choisissiez de faire un don ou non, le simple fait que vous ayez pris le temps de lire cette page
              et d'utiliser MoneyMirror me touche énormément. 💙
            </p>
            <p className="text-lg">
              Chaque utilisateur, chaque feedback, chaque suggestion compte. Vous faites partie de cette aventure,
              et c'est grâce à vous que ce projet prend vie et évolue chaque jour.
            </p>
            <p className="text-xl font-semibold text-purple-700">
              Merci d'avoir cru en MoneyMirror. Merci d'avoir cru en moi. ❤️
            </p>

            <div className="pt-6 border-t-2 border-purple-200 mt-6">
              <p className="text-gray-600 italic">
                "Seul on va plus vite, ensemble on va plus loin."
              </p>
              <p className="text-sm text-gray-500 mt-2">
                - Proverbe africain
              </p>
            </div>

            <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
              <p className="text-gray-700 font-medium mb-3">
                💌 Vous avez des questions ou des suggestions ?
              </p>
              <p className="text-blue-600 font-semibold">
                9880@holbertonschool.com
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Je réponds personnellement à chaque message !
              </p>
            </div>

            <div className="mt-8">
              <p className="text-2xl font-bold text-gray-900 mb-2">
                Avec toute ma gratitude et mon respect,
              </p>
              <p className="text-xl text-blue-600 font-semibold">
                Vithushan
              </p>
              <p className="text-sm text-gray-500">
                Créateur de MoneyMirror
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
