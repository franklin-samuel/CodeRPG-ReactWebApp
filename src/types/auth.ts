export interface AuthStatus {
    authenticated: boolean,
    userId?: string,
    githubUsername?: string,
    name?: string,
    avatarUrl?: string,
    hasValidGitHubToken?: boolean,
    needsOnBoarding?: boolean
}