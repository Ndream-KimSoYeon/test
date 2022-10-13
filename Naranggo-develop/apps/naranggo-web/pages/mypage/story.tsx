import MyStoryList from '@/components/myStory/MyStoryList';
import withAuth from '@/components/common/withAuth';
import HeaderBack from '@/components/layout/HeaderBack';
import { Stack, styled } from '@mui/material';

interface MyStoryProps {
  storyList: StoryItem[];
}
const MyStory: NextPageWithLayout = ({ storyList }: MyStoryProps) => {
  return (
    <Wrapper>
      <HeaderBack pageName={'내 스토리'} />
      <MyStoryList storyList={storyList} />
    </Wrapper>
  );
};

export default withAuth(MyStory);

const Wrapper = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh',

  '& .css-1eblgbs-MuiContainer-root': {
    padding: 0
  }
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
