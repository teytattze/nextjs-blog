import { NextPage } from 'next';
import { PageLayout } from '../layouts/page-layout';
import { PostCreateForm } from '../modules/posts/components/post-create-form';

const CreatePostPage: NextPage = () => {
	return (
		<PageLayout title="New Post">
			<PostCreateForm />
		</PageLayout>
	);
};

export default CreatePostPage;
