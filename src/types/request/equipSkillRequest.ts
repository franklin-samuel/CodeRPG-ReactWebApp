import type { SkillType } from "../skill";

export interface EquipSkillRequest {
    skillType: SkillType,
    skillName: string,
    equip: boolean
}