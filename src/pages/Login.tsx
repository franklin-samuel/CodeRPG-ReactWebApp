import { Github } from 'lucide-react'
import { useAuth } from '../hooks'

export function LoginPage() {
  const { login } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-2">CoderPG</h1>
          <p className="text-gray-300 text-lg">Level up your coding journey</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 shadow-xl border border-white/20">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-white">Welcome, Developer!</h2>
              <p className="text-gray-300">Sign in to start your adventure</p>
            </div>

            <button
              onClick={login}
              className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors border border-gray-700"
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </button>

            <div className="text-center text-sm text-gray-400">
              By signing in, you agree to our Terms of Service
            </div>
          </div>
        </div>

        <div className="text-center text-gray-400 text-sm">
          <p>Transform your GitHub activity into RPG achievements</p>
        </div>
      </div>
    </div>
  )
}