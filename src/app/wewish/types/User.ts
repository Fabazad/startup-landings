export type User = {
    id: string;
    displayName: string;
    avatarUrl: string;
    about: string;
    birthday: string;
    email: string;
    hasPassword: boolean;
}

export type UserStats = {
    wishListCount: number;
    wishCount: number;
    followingCount: number;
}