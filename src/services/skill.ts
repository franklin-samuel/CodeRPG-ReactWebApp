import request, { unwrapApiResponse } from '../utils/request'
import type { ApiResponse } from '../types/api'
import type { EquipSkillRequest } from '../types/request/equipSkillRequest'
import type { SkillHistoryResponse } from '../types/response/skillHistoryResponse'
import type { SkillType, Skill } from '../types/skill'
import type { SaveSkillProgressRequest } from '../types/request/saveSkillProgressRequest'

export const skillService = {
  
  getSkillHistory: async (): Promise<SkillHistoryResponse> => {
    const response = await request.get<ApiResponse<SkillHistoryResponse>>('/skills/history')
    return unwrapApiResponse(response)
  },

  getSkillsByType: async (type: SkillType): Promise<Skill[]> => {
    const response = await request.get<ApiResponse<Skill[]>>(`/skills/type/${type}`)
    return unwrapApiResponse(response)
  },

  updateSkillEquipment: async (data: EquipSkillRequest): Promise<Skill> => {
    const response = await request.patch<ApiResponse<Skill>>('/skills/equipment', data)
    return unwrapApiResponse(response)
  },

  saveSkillProgress: async (data: SaveSkillProgressRequest): Promise<Skill> => {
    const response = await request.post<ApiResponse<Skill>>('/skills/progress', data)
    return unwrapApiResponse(response)
  },
}