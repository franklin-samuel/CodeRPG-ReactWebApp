import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '../services'
import { QueryKeys } from '../utils/queryClient'


export function useUser() {
  const queryClient = useQueryClient()

  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
    refetch: refetchUser,
  } = useQuery({
    queryKey: QueryKeys.user.me(),
    queryFn: userService.getCurrentUser,
    retry: 1,
  })

  const {
    data: userStats,
    isLoading: isLoadingStats,
    error: statsError,
    refetch: refetchStats,
  } = useQuery({
    queryKey: QueryKeys.user.stats(),
    queryFn: userService.getUserStats,
    enabled: !!user,
  })

  const completeOnBoardingMutation = useMutation({
    mutationFn: userService.completeOnBoarding,
    onSuccess: (data) => {
      queryClient.setQueryData(QueryKeys.user.me(), data)
      queryClient.invalidateQueries({ queryKey: QueryKeys.user.all })
    },
  })

  const updateBuildMutation = useMutation({
    mutationFn: userService.updateBuild,
    onSuccess: (data) => {
      queryClient.setQueryData(QueryKeys.user.me(), data)
      queryClient.invalidateQueries({ queryKey: QueryKeys.user.all })
    },
  })

  const followUserMutation = useMutation({
    mutationFn: userService.followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.user.following() })
      queryClient.invalidateQueries({ queryKey: QueryKeys.user.stats() })
    },
  })

  const unfollowUserMutation = useMutation({
    mutationFn: userService.unfollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.user.following() })
      queryClient.invalidateQueries({ queryKey: QueryKeys.user.stats() })
    },
  })

  const {
    data: followers,
    isLoading: isLoadingFollowers,
  } = useQuery({
    queryKey: QueryKeys.user.followers(),
    queryFn: userService.getMyFollowers,
    enabled: !!user,
  })

  const {
    data: following,
    isLoading: isLoadingFollowing,
  } = useQuery({
    queryKey: QueryKeys.user.following(),
    queryFn: userService.getMyFollowing,
    enabled: !!user,
  })

  const refreshUser = async () => {
    await Promise.all([
      refetchUser(),
      refetchStats(),
    ])
  }

  return {
    user,
    userStats,
    followers,
    following,
    
    isLoading: isLoadingUser || isLoadingStats,
    isLoadingUser,
    isLoadingStats,
    isLoadingFollowers,
    isLoadingFollowing,
    
    error: userError || statsError,
    userError,
    statsError,
    
    refreshUser,
    refetchUser,
    refetchStats,
    
    completeOnBoarding: completeOnBoardingMutation.mutate,
    completeOnBoardingAsync: completeOnBoardingMutation.mutateAsync,
    isCompletingOnBoarding: completeOnBoardingMutation.isPending,
    
    updateBuild: updateBuildMutation.mutate,
    updateBuildAsync: updateBuildMutation.mutateAsync,
    isUpdatingBuild: updateBuildMutation.isPending,
    
    followUser: followUserMutation.mutate,
    followUserAsync: followUserMutation.mutateAsync,
    isFollowing: followUserMutation.isPending,
    
    unfollowUser: unfollowUserMutation.mutate,
    unfollowUserAsync: unfollowUserMutation.mutateAsync,
    isUnfollowing: unfollowUserMutation.isPending,
  }
}

export function useUserById(userId: string, enabled = true) {
  return useQuery({
    queryKey: QueryKeys.user.byId(userId),
    queryFn: () => userService.getUserById(userId),
    enabled: enabled && !!userId,
  })
}