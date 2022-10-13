import withAuth from '@/components/common/withAuth';
import StoryWrite from '@/components/story/write/StoryWrite';

const Write: NextPageWithLayout = () => {
  return <StoryWrite />;
};

export default withAuth(Write);
