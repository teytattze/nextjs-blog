export interface IAccount {
	id: string;
	displayName: string;
	email: string;
	emailVerified?: boolean;
	providerId?: string | null;
	photoUrl?: string | null;
}

export interface ILoginData {
	email: string;
	password: string;
}

export interface IRegisterData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}
