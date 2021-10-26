export interface IPost {
	id: string;
	authorId: string;
	title: string;
	content: string;
	published: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface IPostWithAuthor extends IPost {
	author: {
		username: string;
	};
}

export interface IIndexPostFilter {
	userId?: string;
	published?: boolean;
}

export interface ICreatePostData {
	title: string;
	content: string;
	published: boolean;
	authorId: string;
}

export interface IUpdatePostData {
	title?: string;
	content?: string;
	published?: boolean;
}
