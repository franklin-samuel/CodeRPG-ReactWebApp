import request, { unwrapApiResponse } from '../utils/request'
import type { ApiResponse } from '../types/api'
import type { Mission } from '../types/mission'
import type { MissionListResponse } from '../types/response/missionListResponse'


export const missionService = {
  
  getDailyMissions: async (): Promise<MissionListResponse> => {
    const response = await request.get<ApiResponse<MissionListResponse>>('/missions/daily')
    return unwrapApiResponse(response)
  },

  getActiveMissions: async (): Promise<MissionListResponse> => {
    const response = await request.get<ApiResponse<MissionListResponse>>('/missions/active')
    return unwrapApiResponse(response)
  },

  getAllMissions: async (): Promise<MissionListResponse> => {
    const response = await request.get<ApiResponse<MissionListResponse>>('/missions')
    return unwrapApiResponse(response)
  },

  getMissionById: async (missionId: string): Promise<Mission> => {
    const response = await request.get<ApiResponse<Mission>>(`/missions/${missionId}`)
    return unwrapApiResponse(response)
  },

  completeMission: async (missionId: string): Promise<Mission> => {
    const response = await request.patch<ApiResponse<Mission>>(`/missions/${missionId}/complete`)
    return unwrapApiResponse(response)
  },
}