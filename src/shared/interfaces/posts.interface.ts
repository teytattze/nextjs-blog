import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface IPost {
	id: string;
	authorId: string;
	title: string;
	storageUrl: string;
	content?: MDXRemoteSerializeResult<Record<string, unknown>> | null;
	rawContent?: string | null;
	published: boolean;
	createdAt: string;
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
