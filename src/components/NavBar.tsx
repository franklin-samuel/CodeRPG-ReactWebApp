import { LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export function Navbar() {
  const { logout, isLoggingOut, githubUsername, avatarUrl } = useAuth()

  return (
    <nav className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-white">CoderPG</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {avatarUrl && (
                <img src={avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full" />
              )}
              <span className="text-white font-medium">{githubUsername}</span>
            </div>
            <button
              onClick={() => logout()}
              disabled={isLoggingOut}
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}