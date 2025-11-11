export type Mission = {
  id: string
  missionId: string
  missionType: MissionType
  title: string
  description: string
  icon: string
  rewardXp: number
  difficulty: Difficulty
  progress: number
  target: number
  progressPercentage: number
  completed: boolean
  completedAt: string | null
  expiresAt: string
  isExpired: boolean
  timeRemaining: number | null
  createdAt: string
}

export type MissionType =
    | 'DAILY'
    | 'WEEKLY'

export type Difficulty = 
    | 'EASY'
    | 'NORMAL'
    | 'HARD'