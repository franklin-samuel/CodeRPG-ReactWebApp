import type { ClassType } from "../user";

export interface CompleteOnBoardingRequest {
    name: string,
    classType: ClassType,
    email?: string
}