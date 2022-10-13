import StoryList from '@/components/common/storyList/StoryList';
import withAuth from '@/components/common/withAuth';
import HeaderBack from '@/components/layout/HeaderBack';
import { Stack, styled } from '@mui/material';

interface FavoriteProps {
  storyList: StoryItem[];
}
const Favorite: NextPageWithLayout = ({ storyList }: FavoriteProps) => (
  <Wrapper>
    <HeaderBack pageName={'좋아하는 스토리'} />
    <StoryList storyList={storyList} />
  </Wrapper>
);

export default withAuth(Favorite);

const Wrapper = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh'
}));

export const getServerSideProps = async () => {
  const res = await fetch(
    'https://gist.githubusercontent.com/Ndream-KimYoungHoo/58a617c64f4d8a7cd6ac78bf936e5855/raw/4bae1a105b6db6c8c98117acf363f19c17069867/gistfile1.json'
  );
  const { StoryListData } = await res.json();

  return {
    props: { storyList: StoryListData.data }
  };
};
