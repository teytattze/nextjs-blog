import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface IAuthor {
  authorId: string;
  authorName: string;
}

export interface IPost extends IAuthor {
  id: string;
  title: string;
  storageUrl: string;
  content?: string;
  mdxContent?: MDXRemoteSerializeResult<Record<string, unknown>>;
  published: boolean;
  createdAt: string;
}

export interface ICreatePostData extends IAuthor {
  title: string;
  content: string;
  published: boolean;
}

export interface IUpdatePostData extends IAuthor {
  id: string;
  title: string;
  content: string;
  published: boolean;
}

export interface IDeletePostData {
  id: string;
  authorId: string;
}

export interface IPostsFilters {
  id?: string;
  authorId?: string;
  published?: boolean;
}
