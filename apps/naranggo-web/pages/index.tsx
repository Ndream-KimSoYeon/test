import MainLayout from '@/components/layout/MainLayout';
import MapContents from '@/components/map/MapContents';
import { Stack, styled } from '@mui/material';
import withAuth from '@/components/common/withAuth';
// import { data } from '@naranggo/shared';
interface MapProps {
  storyList: StoryItem[];
}

const Map: NextPageWithLayout = (props: MapProps) => (
  <Wrapper>
    <MapContents {...props} />
  </Wrapper>
);

Map.getLayout = (page: React.ReactElement): React.ReactElement => {
  return <MainLayout isNotStrictPage>{page}</MainLayout>;
};

export default withAuth(Map);

const Wrapper = styled(Stack)(() => ({
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  height: '100%'
}));

export const getStaticProps = async () => {
  const res = await fetch(
    'https://gist.githubusercontent.com/Ndream-KimYoungHoo/58a617c64f4d8a7cd6ac78bf936e5855/raw/4bae1a105b6db6c8c98117acf363f19c17069867/gistfile1.json'
  );

  const { StoryListData } = await res.json();

  return {
    props: {
      storyList: StoryListData.data
    }
  };
};
