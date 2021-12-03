import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface IAuthor {
  authorId: string;
  authorName: string;
}

export interface IPost extends IAuthor {
  id: string;
  title: string;
  storageUrl: string;
  content?: MDXRemoteSerializeResult<Record<string, unknown>> | null;
  rawContent?: string | null;
  published: boolean;
  createdAt: string;
}

export interface ICreatePostData extends IAuthor {
  title: string;
  content: string;
  published: boolean;
}

export interface IPostsFilters {
  published?: boolean;
  authorId?: string;
}
