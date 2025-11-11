import type { Skill } from "../skill";

export interface SkillHistoryResponse {
    skills: Skill[],
    totalSkills: number,
    equippedSkills: number,
    equippedSkillsList: Skill[]
}