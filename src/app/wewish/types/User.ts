export type User = {
    id: string;
    displayName: string;
    avatarUrl: string;
    about: string;
    birthday: string;
    email: string;
}

export type UserStats = {
    wishListCount: number;
    wishCount: number;
    followingCount: number;
}