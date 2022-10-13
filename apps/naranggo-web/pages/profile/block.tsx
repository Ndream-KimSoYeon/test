import HeaderBack from '@/components/layout/HeaderBack';
import { Stack, styled } from '@mui/material';
import BlockList from '@/components/follow/BlockList';
import withAuth from '@/components/common/withAuth';

interface FollowProps {
  followList: FollowItem[];
}

const Block: NextPageWithLayout = ({ followList }: FollowProps) => {
  return (
    <Wrapper>
      <HeaderBack pageName="차단 리스트" />
      <BlockList followList={followList} />
    </Wrapper>
  );
};

export default withAuth(Block);

const Wrapper = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh'
}));

export const getServerSideProps = async () => {
  const res = await fetch(
    'https://gist.githubusercontent.com/Ndream-KimYoungHoo/58a617c64f4d8a7cd6ac78bf936e5855/raw/4bae1a105b6db6c8c98117acf363f19c17069867/gistfile1.json'
  );

  const { FollowListData } = await res.json();

  return {
    props: { followList: FollowListData }
  };
};
