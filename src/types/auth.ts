export interface AuthStatus {
    authenticated: boolean,
    userId?: string,
    githubUsername?: string,
    name?: string,
    avataUrl?: string,
    hasValidGitHubToken?: string,
    needsOnBoarding?: string
}