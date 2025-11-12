import request, { unwrapApiResponse } from '../utils/request'
import type { ApiResponse } from '../types/api'
import type { User, UserStats } from '../types/user'
import type { CompleteOnBoardingRequest } from '../types/request/onboarding'
import type { UpdateUserBuildRequest } from '../types/request/updateBuildRequest'


export const userService = {
  
  getCurrentUser: async (): Promise<User> => {
    const response = await request.get<ApiResponse<User>>('/users/me')
    return unwrapApiResponse(response)
  },

  getUserById: async (userId: string): Promise<User> => {
    const response = await request.get<ApiResponse<User>>(`/users/${userId}`)
    return unwrapApiResponse(response)
  },

  completeOnBoarding: async (data: CompleteOnBoardingRequest): Promise<User> => {
    const response = await request.put<ApiResponse<User>>('/users/me/onboarding', data)
    return unwrapApiResponse(response)
  },

  updateBuild: async (data: UpdateUserBuildRequest): Promise<User> => {
    const response = await request.put<ApiResponse<User>>('/users/me/build', data)
    return unwrapApiResponse(response)
  },

  getUserStats: async (): Promise<UserStats> => {
    const response = await request.get<ApiResponse<UserStats>>('/users/me/stats')
    return unwrapApiResponse(response)
  },

  followUser: async (userId: string): Promise<string> => {
    const response = await request.post<ApiResponse<string>>(`/users/me/following/${userId}`)
    return unwrapApiResponse(response)
  },

  unfollowUser: async (userId: string): Promise<string> => {
    const response = await request.delete<ApiResponse<string>>(`/users/me/following/${userId}`)
    return unwrapApiResponse(response)
  },

  getMyFollowers: async (): Promise<User[]> => {
    const response = await request.get<ApiResponse<User[]>>('/users/me/followers')
    return unwrapApiResponse(response)
  },

  getMyFollowing: async (): Promise<User[]> => {
    const response = await request.get<ApiResponse<User[]>>('/users/me/following')
    return unwrapApiResponse(response)
  },

  getUserFollowers: async (userId: string): Promise<User[]> => {
    const response = await request.get<ApiResponse<User[]>>(`/users/${userId}/followers`)
    return unwrapApiResponse(response)
  },

  getUserFollowing: async (userId: string): Promise<User[]> => {
    const response = await request.get<ApiResponse<User[]>>(`/users/${userId}/following`)
    return unwrapApiResponse(response)
  }
}