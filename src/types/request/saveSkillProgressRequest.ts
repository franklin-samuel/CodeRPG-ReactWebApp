import type { SkillType } from "../skill";

export interface SaveSkillProgressRequest {
    skillType: SkillType,
    skillName: string,
    xpToAdd: number
}