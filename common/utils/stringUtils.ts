export const grabIdFromUserId = (userId: string): string => {
    return userId.split('_').pop()
}