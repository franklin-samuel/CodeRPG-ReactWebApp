import { useUser, useMissions } from '../hooks'

export function HomePage() {
  const { user, userStats, isLoading: isLoadingUser } = useUser()
  const { dailyMissions, isLoadingDaily } = useMissions()

  if (isLoadingUser || isLoadingDaily) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500 mx-auto mb-4" />
          <p className="text-white text-lg">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.name || user?.githubUsername}! 👋
        </h1>
        <p className="text-gray-300">
          Level {userStats?.level || 1} {user?.classDisplayName || 'Developer'}
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4">Today's Missions</h2>
        {dailyMissions.length === 0 ? (
          <p className="text-gray-400">No missions available today</p>
        ) : (
          <div className="space-y-3">
            {dailyMissions.slice(0, 5).map((mission) => (
              <div
                key={mission.id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-white font-medium">{mission.title}</p>
                  <p className="text-gray-400 text-sm">{mission.description}</p>
                  <div className="mt-2 bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-purple-500 h-full transition-all"
                      style={{ width: `${mission.progressPercentage}%` }}
                    />
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <p className="text-yellow-400 font-bold">+{mission.rewardXp} XP</p>
                  <p className="text-gray-400 text-sm">
                    {mission.progress}/{mission.target}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}