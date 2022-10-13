import withAuth from '@/components/common/withAuth';
import StoryWriteSave from '@/components/story/write/StoryWriteSave';

const Save: NextPageWithLayout = () => {
  return <StoryWriteSave />;
};

export default withAuth(Save);
