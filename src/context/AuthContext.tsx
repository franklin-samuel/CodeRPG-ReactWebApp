import {
  createContext,
  useContext,
  useCallback,
  type PropsWithChildren,
} from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth as useAuthHook } from '../hooks/useAuth'
import type { AuthStatus } from '../types/auth'

interface AuthContextValue {

  authStatus: AuthStatus | null | undefined
  isAuthenticated: boolean
  isLoading: boolean
  error: Error | null

  userId?: string
  githubUsername?: string
  avatarUrl?: string
  needsOnBoarding?: boolean
  hasValidGitHubToken?: boolean

  login: () => void
  logout: () => Promise<void>
  refreshToken: () => Promise<void>
  checkAuth: () => Promise<void>

  isLoggingOut: boolean
  isRefreshing: boolean
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient()
  
  const {
    authStatus,
    isAuthenticated,
    isLoading,
    error,
    login,
    logoutAsync,
    refreshTokenAsync,
    checkAuth: refetchAuth,
    isLoggingOut,
    isRefreshing,
  } = useAuthHook()

  const logout = useCallback(async () => {
    try {
      await logoutAsync()
      queryClient.clear()
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      throw error
    }
  }, [logoutAsync, queryClient])

  const refreshToken = useCallback(async () => {
    try {
      await refreshTokenAsync()
    } catch (error) {
      console.error('Erro ao refresh token:', error)
      await logout()
    }
  }, [refreshTokenAsync, logout])

  const checkAuth = useCallback(async () => {
    try {
      await refetchAuth()
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error)
    }
  }, [refetchAuth])

  const userId = authStatus?.userId
  const githubUsername = authStatus?.githubUsername
  const avatarUrl = authStatus?.avatarUrl
  const needsOnBoarding = authStatus?.needsOnBoarding ?? false
  const hasValidGitHubToken = authStatus?.hasValidGitHubToken ?? false


  const value: AuthContextValue = {
    authStatus,
    isAuthenticated,
    isLoading,
    error,

    userId,
    githubUsername,
    avatarUrl,
    needsOnBoarding,
    hasValidGitHubToken,

    login,
    logout,
    refreshToken,
    checkAuth,

    isLoggingOut,
    isRefreshing,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }

  return context
}

export { useAuthContext as useAuth }