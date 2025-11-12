import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { skillService } from '../services'
import type { EquipSkillRequest } from '../types/request/equipSkillRequest'
import type { SkillType } from '../types/skill'
import { QueryKeys } from '../utils/queryClient'


export function useSkills() {
  const queryClient = useQueryClient()

  const {
    data: skillHistory,
    isLoading,
    error,
    refetch: refetchSkills,
  } = useQuery({
    queryKey: QueryKeys.skills.history(),
    queryFn: skillService.getSkillHistory,
  })

  const updateSkillEquipmentMutation = useMutation({
    mutationFn: skillService.updateSkillEquipment,
    onSuccess: (updatedSkill) => {
      queryClient.setQueryData(QueryKeys.skills.history(), (old: any) => {
        if (!old) return old
        
        return {
          ...old,
          skills: old.skills.map((skill: any) => {
            if (skill.skillType === updatedSkill.skillType && skill.id !== updatedSkill.id) {
              return { ...skill, isEquipped: false }
            }
            if (skill.id === updatedSkill.id) {
              return updatedSkill
            }
            return skill
          }),
          equippedSkillsList: old.equippedSkillsList
            .filter((s: any) => s.skillType !== updatedSkill.skillType)
            .concat(updatedSkill.isEquipped ? [updatedSkill] : []),
          equippedSkills: old.equippedSkillsList
            .filter((s: any) => s.skillType !== updatedSkill.skillType)
            .concat(updatedSkill.isEquipped ? [updatedSkill] : []).length,
        }
      })
      
      queryClient.invalidateQueries({ queryKey: QueryKeys.skills.all })
    },
  })

  const saveSkillProgressMutation = useMutation({
    mutationFn: skillService.saveSkillProgress,
    onSuccess: (updatedSkill) => {
      queryClient.setQueryData(QueryKeys.skills.history(), (old: any) => {
        if (!old) return old
        
        const existingSkillIndex = old.skills.findIndex(
          (s: any) => s.skillType === updatedSkill.skillType && s.skillName === updatedSkill.skillName
        )
        
        if (existingSkillIndex >= 0) {
          return {
            ...old,
            skills: old.skills.map((skill: any, index: number) =>
              index === existingSkillIndex ? updatedSkill : skill
            ),
          }
        } else {
          return {
            ...old,
            skills: [...old.skills, updatedSkill],
            totalSkills: old.totalSkills + 1,
          }
        }
      })
      
      queryClient.invalidateQueries({ queryKey: QueryKeys.skills.all })
    },
  })

  const equipSkill = (skillType: SkillType, skillName: string) => {
    const request: EquipSkillRequest = { skillType, skillName, equip: true }
    return updateSkillEquipmentMutation.mutateAsync(request)
  }

  const unequipSkill = (skillType: SkillType, skillName: string) => {
    const request: EquipSkillRequest = { skillType, skillName, equip: false }
    return updateSkillEquipmentMutation.mutateAsync(request)
  }

  return {
    skillHistory,
    skills: skillHistory?.skills ?? [],
    equippedSkills: skillHistory?.equippedSkillsList ?? [],
    totalSkills: skillHistory?.totalSkills ?? 0,
    
    isLoading,
    isUpdatingEquipment: updateSkillEquipmentMutation.isPending,
    isSavingProgress: saveSkillProgressMutation.isPending,
    
    error,
    equipmentError: updateSkillEquipmentMutation.error,
    progressError: saveSkillProgressMutation.error,
    
    refetchSkills,
    equipSkill,
    unequipSkill,
    
    updateSkillEquipment: updateSkillEquipmentMutation.mutate,
    updateSkillEquipmentAsync: updateSkillEquipmentMutation.mutateAsync,
    
    saveSkillProgress: saveSkillProgressMutation.mutate,
    saveSkillProgressAsync: saveSkillProgressMutation.mutateAsync,
  }
}

export function useSkillsByType(type: SkillType, enabled = true) {
  return useQuery({
    queryKey: QueryKeys.skills.byType(type),
    queryFn: () => skillService.getSkillsByType(type),
    enabled: enabled && !!type,
  })
}