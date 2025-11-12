import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const QueryKeys = {
  auth: {
    all: ['auth'] as const,
    status: () => [...QueryKeys.auth.all, 'status'] as const,
  },
  user: {
    all: ['user'] as const,
    me: () => [...QueryKeys.user.all, 'me'] as const,
    byId: (id: string) => [...QueryKeys.user.all, id] as const,
    stats: () => [...QueryKeys.user.all, 'stats'] as const,
    followers: () => [...QueryKeys.user.all, 'followers'] as const,
    following: () => [...QueryKeys.user.all, 'following'] as const,
  },
  skills: {
    all: ['skills'] as const,
    history: () => [...QueryKeys.skills.all, 'history'] as const,
    byType: (type: string) => [...QueryKeys.skills.all, 'type', type] as const,
  },
  missions: {
    all: ['missions'] as const,
    daily: () => [...QueryKeys.missions.all, 'daily'] as const,
    active: () => [...QueryKeys.missions.all, 'active'] as const,
    list: () => [...QueryKeys.missions.all, 'list'] as const,
    byId: (id: string) => [...QueryKeys.missions.all, id] as const,
  },
} as const