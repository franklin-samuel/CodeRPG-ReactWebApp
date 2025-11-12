import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '../services'
import { QueryKeys } from '../utils/queryClient'

export function useAuth() {
  const queryClient = useQueryClient()

  const {
    data: authStatus,
    isLoading,
    error,
    refetch: checkAuth,
  } = useQuery({
    queryKey: QueryKeys.auth.status(),
    queryFn: authService.getAuthStatus,
    retry: false,
    staleTime: 1 * 60 * 1000,
  })

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.clear()
      window.location.href = '/auth/login'
    },
  })

  const refreshTokenMutation = useMutation({
    mutationFn: authService.refreshToken,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.auth.status() })
    },
  })

  const login = () => {
    authService.redirectToGitHubLogin()
  }

  return {
    authStatus,
    isAuthenticated: authStatus?.authenticated ?? false,
    
    isLoading,
    error,
    
    checkAuth,
    login,
    logout: logoutMutation.mutate,
    logoutAsync: logoutMutation.mutateAsync,
    refreshToken: refreshTokenMutation.mutate,
    refreshTokenAsync: refreshTokenMutation.mutateAsync,
    
    isLoggingOut: logoutMutation.isPending,
    isRefreshing: refreshTokenMutation.isPending,
  }
}