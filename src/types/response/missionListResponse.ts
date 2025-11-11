import type { Mission } from "../mission";

export interface MissionListResponse {
    missions: Mission[],
    totalMissions: number,
    completedMissions: number,
    activeMissions: number,
    totalXpEarned: number,
    potentialXp: number
}