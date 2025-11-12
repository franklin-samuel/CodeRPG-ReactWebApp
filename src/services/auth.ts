import request, { unwrapApiResponse } from "../utils/request";
import type { ApiResponse } from "../types/api";
import type { AuthStatus } from "../types/auth";


export const authService = {
  
  getAuthStatus: async (): Promise<AuthStatus> => {
    const response = await request.get<ApiResponse<AuthStatus>>('/auth/status')
    return unwrapApiResponse(response)
  },

  
  logout: async (): Promise<string> => {
    const response = await request.post<ApiResponse<string>>('/auth/logout')
    return unwrapApiResponse(response)
  },

  
  refreshToken: async (): Promise<string> => {
    const response = await request.post<ApiResponse<string>>('/auth/refresh')
    return unwrapApiResponse(response)
  },

  
  redirectToGitHubLogin: () => {
    window.location.href = `${import.meta.env.VITE_API_URL?.replace('/api', '')}/oauth2/authorization/github`
  },
}