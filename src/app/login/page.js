'use client''use client''use client''use client''use client'

import { signIn, signOut, useSession } from 'next-auth/react'

import { useState } from 'react'import { signIn, signOut, useSession } from 'next-auth/react'



export default function LoginPage() {import { useState } from 'react'import { signIn, signOut, useSession } from 'next-auth/react'

  const [email, setEmail] = useState('jean@example.com')

  const [password, setPassword] = useState('password123')

  const [error, setError] = useState('')

  const { data: session } = useSession()export default function LoginPage() {import { useState } from 'react'import { signIn, useSession } from 'next-auth/react'



  if (session) {  const [email, setEmail] = useState('jean@example.com')

    return (

      <div style={{ padding: '20px', textAlign: 'center' }}>  const [password, setPassword] = useState('password123')

        <h1>✅ Connecté !</h1>

        <p>Salut <strong>{session.user.name}</strong> !</p>  const [error, setError] = useState('')

        <p>Email: {session.user.email}</p>

        <button onClick={() => signOut()}>Se déconnecter</button>  const { data: session } = useSession()export default function LoginPage() {import { useState } from 'react'import { useState } from 'react'

      </div>

    )

  }

  // Si connecté, montrer l'info utilisateur  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {

    e.preventDefault()  if (session) {

    setError('')

        return (  const [password, setPassword] = useState('')import { signIn, getSession } from 'next-auth/react'

    console.log('🔄 Tentative de connexion:', { email })

          <div className="container">

    const result = await signIn('credentials', {

      email,        <h1>✅ Connecté !</h1>  const [error, setError] = useState('')

      password,

      redirect: false,        <p>Salut {session.user.name} !</p>

    })

            <p>Email: {session.user.email}</p>  const { data: session } = useSession()export default function LoginPage() {import { useRouter } from 'next/navigation'

    console.log('📊 Résultat NextAuth:', result)

            <button onClick={() => signOut()}>Se déconnecter</button>

    if (result?.error) {

      setError('❌ Email ou mot de passe incorrect')        <style jsx>{`

    }

  }          .container { padding: 20px; max-width: 400px; margin: 0 auto; }



  return (        `}</style>  if (session) {  const [email, setEmail] = useState('')import Link from 'next/link'

    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>

      <h1>🔐 Connexion MoneyMirror</h1>      </div>

      

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}    )    return (

      

      <form onSubmit={handleSubmit}>  }

        <input

          type="email"      <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>  const [password, setPassword] = useState('')

          placeholder="Email"

          value={email}  const handleSubmit = async (e) => {

          onChange={(e) => setEmail(e.target.value)}

          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}    e.preventDefault()        <h1>✅ Connecté !</h1>

          required

        />    setError('')

        

        <input            <p>Salut {session.user.name} !</p>  const [error, setError] = useState('')export default function LoginPage() {

          type="password"

          placeholder="Mot de passe"    console.log('🔄 Tentative de connexion:', { email, password: '***' })

          value={password}

          onChange={(e) => setPassword(e.target.value)}            <p>Email: {session.user.email}</p>

          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}

          required    const result = await signIn('credentials', {

        />

              email,        <button onClick={() => signOut()}>Se déconnecter</button>  const { data: session } = useSession()  const [email, setEmail] = useState('')

        <button 

          type="submit"      password,

          style={{ 

            width: '100%',       redirect: false,      </div>

            padding: '10px', 

            background: '#0070f3',     })

            color: 'white', 

            border: 'none',        )  const [password, setPassword] = useState('')

            borderRadius: '4px'

          }}    console.log('📊 Résultat NextAuth:', result)

        >

          Se connecter      }

        </button>

      </form>    if (result?.error) {

      

      <p style={{ marginTop: '20px', fontSize: '12px', textAlign: 'center' }}>      setError('❌ Email ou mot de passe incorrect')  if (session) {  const [isLoading, setIsLoading] = useState(false)

        Prérempli: jean@example.com / password123

      </p>      console.log('❌ Erreur:', result.error)

    </div>

  )    } else {  const handleSubmit = async (e) => {

}
      console.log('✅ Connexion réussie !')

    }    e.preventDefault()    return (  const [error, setError] = useState('')

  }

    setError('')

  return (

    <div className="container">          <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>  const router = useRouter()

      <h1>🔐 Connexion MoneyMirror</h1>

          console.log('🔄 Tentative de connexion:', { email, password: '***' })

      {error && (

        <div className="error">            <h1>✅ Connecté !</h1>

          {error}

        </div>    const result = await signIn('credentials', {

      )}

            email,        <p>Salut {session.user.name} !</p>  const handleSubmit = async (e) => {

      <form onSubmit={handleSubmit}>

        <div className="field">      password,

          <input

            type="email"      redirect: false,        <p>Email: {session.user.email}</p>    e.preventDefault()

            placeholder="Email"

            value={email}    })

            onChange={(e) => setEmail(e.target.value)}

            required            <button onClick={() => signOut()}>Se déconnecter</button>    setIsLoading(true)

          />

        </div>    console.log('📊 Résultat NextAuth:', result)

        

        <div className="field">          </div>    setError('')

          <input

            type="password"    if (result?.error) {

            placeholder="Mot de passe"

            value={password}      setError('❌ Email ou mot de passe incorrect')    )

            onChange={(e) => setPassword(e.target.value)}

            required      console.log('❌ Erreur:', result.error)

          />

        </div>    } else {  }    try {

        

        <button type="submit" className="submit-btn">      console.log('✅ Connexion réussie !')

          Se connecter

        </button>    }      const result = await signIn('credentials', {

      </form>

        }

      <p className="hint">

        Test avec: jean@example.com / password123  const handleSubmit = async (e) => {        email,

      </p>

        return (

      <style jsx>{`

        .container {     <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>    e.preventDefault()        password,

          padding: 20px; 

          max-width: 400px;       <h1>🔐 Connexion MoneyMirror</h1>

          margin: 0 auto; 

        }          setError('')        redirect: false,

        .error { 

          color: red;       {error && (

          margin-bottom: 10px; 

        }        <div style={{ color: 'red', marginBottom: '10px' }}>          })

        .field { 

          margin-bottom: 10px;           {error}

        }

        .field input {         </div>    console.log('🔄 Tentative de connexion:', { email, password: '***' })

          width: 100%; 

          padding: 8px;       )}

          border: 1px solid #ddd;

          border-radius: 4px;                if (result?.error) {

        }

        .submit-btn {       <form onSubmit={handleSubmit}>

          width: 100%; 

          padding: 10px;         <div style={{ marginBottom: '10px' }}>    const result = await signIn('credentials', {        setError('Email ou mot de passe incorrect')

          background: #0070f3; 

          color: white;           <input

          border: none; 

          border-radius: 4px;            type="email"      email,      } else {

          cursor: pointer;

        }            placeholder="Email"

        .submit-btn:hover { 

          background: #0056b3;             value={email}      password,        router.push('/dashboard')

        }

        .hint {             onChange={(e) => setEmail(e.target.value)}

          margin-top: 20px; 

          font-size: 12px;             required      redirect: false,      }

          color: #666;

        }            style={{ width: '100%', padding: '8px' }}

      `}</style>

    </div>          />    })    } catch (error) {

  )

}        </div>

                  setError('Une erreur est survenue')

        <div style={{ marginBottom: '10px' }}>

          <input    console.log('📊 Résultat NextAuth:', result)    } finally {

            type="password"

            placeholder="Mot de passe"          setIsLoading(false)

            value={password}

            onChange={(e) => setPassword(e.target.value)}    if (result?.error) {    }

            required

            style={{ width: '100%', padding: '8px' }}      setError('❌ Email ou mot de passe incorrect')  }

          />

        </div>      console.log('❌ Erreur:', result.error)

        

        <button     } else {  return (

          type="submit"

          style={{ width: '100%', padding: '10px', background: '#0070f3', color: 'white', border: 'none' }}      console.log('✅ Connexion réussie !')    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">

        >

          Se connecter    }      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

        </button>

      </form>  }        <div className="text-center mb-8">

      

      <p style={{ marginTop: '20px', fontSize: '12px' }}>          <h1 className="text-3xl font-bold text-gray-900 mb-2">MoneyMirror</h1>

        Test avec: jean@example.com / password123

      </p>  return (          <p className="text-gray-600">Connectez-vous à votre compte</p>

    </div>

  )    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>        </div>

}
      <h1>🔐 Connexion MoneyMirror</h1>

              <form onSubmit={handleSubmit} className="space-y-6">

      {error && (          {error && (

        <div style={{ color: 'red', marginBottom: '10px' }}>            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">

          {error}              {error}

        </div>            </div>

      )}          )}

      

      <form onSubmit={handleSubmit}>          <div>

        <div style={{ marginBottom: '10px' }}>            <label htmlFor="email" className="label">

          <input              Email

            type="email"            </label>

            placeholder="Email"            <input

            value={email}              id="email"

            onChange={(e) => setEmail(e.target.value)}              type="email"

            required              required

            style={{ width: '100%', padding: '8px' }}              className="input-field"

          />              value={email}

        </div>              onChange={(e) => setEmail(e.target.value)}

                      placeholder="votre@email.com"

        <div style={{ marginBottom: '10px' }}>            />

          <input          </div>

            type="password"

            placeholder="Mot de passe"          <div>

            value={password}            <label htmlFor="password" className="label">

            onChange={(e) => setPassword(e.target.value)}              Mot de passe

            required            </label>

            style={{ width: '100%', padding: '8px' }}            <input

          />              id="password"

        </div>              type="password"

                      required

        <button               className="input-field"

          type="submit"              value={password}

          style={{ width: '100%', padding: '10px', background: '#0070f3', color: 'white', border: 'none' }}              onChange={(e) => setPassword(e.target.value)}

        >              placeholder="Votre mot de passe"

          Se connecter            />

        </button>          </div>

      </form>

                <button

      <p style={{ marginTop: '20px', fontSize: '12px' }}>            type="submit"

        Test avec: jean@example.com / password123            disabled={isLoading}

      </p>            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"

    </div>          >

  )            {isLoading ? 'Connexion...' : 'Se connecter'}

}          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
              S'inscrire
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}