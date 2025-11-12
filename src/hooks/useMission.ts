import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { missionService } from '../services'
import { QueryKeys } from '../utils/queryClient'

export function useMissions() {
  const queryClient = useQueryClient()

  const {
    data: dailyMissions,
    isLoading: isLoadingDaily,
    error: dailyError,
    refetch: refetchDaily,
  } = useQuery({
    queryKey: QueryKeys.missions.daily(),
    queryFn: missionService.getDailyMissions,
    staleTime: 10 * 60 * 1000,
  })

  const {
    data: activeMissionsData,
    isLoading: isLoadingActive,
    error: activeError,
    refetch: refetchActive,
  } = useQuery({
    queryKey: QueryKeys.missions.active(),
    queryFn: missionService.getActiveMissions,
  })

  const {
    data: allMissionsData,
    isLoading: isLoadingAll,
    error: allError,
    refetch: refetchAll,
  } = useQuery({
    queryKey: QueryKeys.missions.list(),
    queryFn: missionService.getAllMissions,
  })

  const completeMissionMutation = useMutation({
    mutationFn: missionService.completeMission,
    onSuccess: (completedMission, missionId) => {
      queryClient.setQueryData(QueryKeys.missions.daily(), (old: any) => {
        if (!old) return old
        return {
          ...old,
          missions: old.missions.map((m: any) =>
            m.id === missionId
              ? { ...m, completed: true, completedAt: new Date().toISOString() }
              : m
          ),
          completedMissions: old.completedMissions + 1,
          activeMissions: old.activeMissions - 1,
          totalXpEarned: old.totalXpEarned + completedMission.rewardXp,
          potentialXp: old.potentialXp - completedMission.rewardXp,
        }
      })

      queryClient.setQueryData(QueryKeys.missions.active(), (old: any) => {
        if (!old) return old
        return {
          ...old,
          missions: old.missions.filter((m: any) => m.id !== missionId),
          completedMissions: old.completedMissions + 1,
          activeMissions: old.activeMissions - 1,
          totalXpEarned: old.totalXpEarned + completedMission.rewardXp,
          potentialXp: old.potentialXp - completedMission.rewardXp,
        }
      })

      queryClient.setQueryData(QueryKeys.missions.list(), (old: any) => {
        if (!old) return old
        return {
          ...old,
          missions: old.missions.map((m: any) =>
            m.id === missionId
              ? { ...m, completed: true, completedAt: new Date().toISOString() }
              : m
          ),
          completedMissions: old.completedMissions + 1,
          activeMissions: old.activeMissions - 1,
          totalXpEarned: old.totalXpEarned + completedMission.rewardXp,
          potentialXp: old.potentialXp - completedMission.rewardXp,
        }
      })

      queryClient.invalidateQueries({ queryKey: QueryKeys.user.stats() })
      queryClient.invalidateQueries({ queryKey: QueryKeys.user.me() })
    },
  })

  const refreshMissions = async () => {
    await Promise.all([
      refetchDaily(),
      refetchActive(),
      refetchAll(),
    ])
  }

  return {
    dailyMissions: dailyMissions?.missions ?? [],
    dailyStats: dailyMissions ? {
      totalMissions: dailyMissions.totalMissions,
      completedMissions: dailyMissions.completedMissions,
      activeMissions: dailyMissions.activeMissions,
      totalXpEarned: dailyMissions.totalXpEarned,
      potentialXp: dailyMissions.potentialXp,
    } : null,

    activeMissions: activeMissionsData?.missions ?? [],
    activeStats: activeMissionsData ? {
      totalMissions: activeMissionsData.totalMissions,
      completedMissions: activeMissionsData.completedMissions,
      activeMissions: activeMissionsData.activeMissions,
      totalXpEarned: activeMissionsData.totalXpEarned,
      potentialXp: activeMissionsData.potentialXp,
    } : null,

    allMissions: allMissionsData?.missions ?? [],
    allStats: allMissionsData ? {
      totalMissions: allMissionsData.totalMissions,
      completedMissions: allMissionsData.completedMissions,
      activeMissions: allMissionsData.activeMissions,
      totalXpEarned: allMissionsData.totalXpEarned,
      potentialXp: allMissionsData.potentialXp,
    } : null,

    completedMissions: allMissionsData?.missions.filter(m => m.completed) ?? [],
    
    isLoading: isLoadingDaily || isLoadingActive || isLoadingAll,
    isLoadingDaily,
    isLoadingActive,
    isLoadingAll,
    isCompletingMission: completeMissionMutation.isPending,
    
    error: dailyError || activeError || allError,
    dailyError,
    activeError,
    allError,
    completionError: completeMissionMutation.error,
    
    refreshMissions,
    refetchDaily,
    refetchActive,
    refetchAll,
    
    completeMission: completeMissionMutation.mutate,
    completeMissionAsync: completeMissionMutation.mutateAsync,
  }
}

export function useMissionById(missionId: string, enabled = true) {
  return useQuery({
    queryKey: QueryKeys.missions.byId(missionId),
    queryFn: () => missionService.getMissionById(missionId),
    enabled: enabled && !!missionId,
  })
}