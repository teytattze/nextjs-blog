export interface IUser {
	id: string;
	displayName?: string | null;
	email: string;
	emailVerified: boolean;
	photoUrl?: string | null;
	provider?: string | null;
}

export interface IProfile {
	firstName: string;
	lastName: string;
}
