
export interface User {
  id: string
  githubId: number
  githubUsername: string
  name: string | null
  email: string | null
  avatarUrl: string | null
  bio: string | null
  location: string | null
  website: string | null
  classType: ClassType
  classDisplayName: string | null
  level: number
  xp: number
  totalXp: number
  githubPublicRepos: number
  githubFollowers: number
  githubFollowing: number
  currentStreak: number
  longestStreak: number
  lastActivityDate: string | null
  followersCount: number
  followingCount: number
  lastSyncAt: string | null
  syncStatus: SyncStatus
  build?: UserBuild | null
  createdAt: string
  modifiedAt: string
}

export type UserBuild = {
  id: string
  primaryLanguage: string
  primaryLanguageLevel: number
  primaryLanguageXp: number
  secondaryLanguage: string
  secondaryLanguageLevel: number
  secondaryLanguageXp: number
  framework: string
  database: string
  cloud: string
  tool1: string | null
  tool2: string | null
}

export type UserStats = {
  level: number
  xp: number
  xpToNextLevel: number
  totalXp: number
  currentStreak: number
  longestStreak: number
  totalSkills: number
  equippedSkills: number
  completedMissions?: number
  activeMissions?: number
  followersCount: number
  followingCount: number
  githubPublicRepos: number
  githubFollowers: number
}

export type ClassType = 
  | 'FRONTEND'
  | 'BACKEND'
  | 'FULLSTACK'
  | 'DATA_ENGINEER'
  | 'DEVOPS'
  | 'MOBILE'

export type SyncStatus = 
  | 'PENDING'
  | 'SYNCING'
  | 'COMPLETED'
  | 'ERROR'
