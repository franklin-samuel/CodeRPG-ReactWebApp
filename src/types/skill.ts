export type Skill = {
  id: string
  userId: string
  skillType: SkillType
  skillTypeName: string
  skillName: string
  level: number
  xp: number
  xpToNextLevel: number
  isEquipped: boolean
  firstEquippedAt: string | null
  lastEquippedAt: string | null
  unequippedAt: string | null
  createdAt: string
}

export type SkillType = 
    | 'PRIMARY_LANGUAGE'
    | 'SECONDARY_LANGUAGE'
    | 'FRAMEWORK'
    | 'DATABASE'
    | 'CLOUD'
    | 'TOOL1'
    | 'TOOL2'