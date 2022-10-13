import HeaderBack from '@/components/layout/HeaderBack';
import { Stack, styled } from '@mui/material';
import FollowList from '@/components/follow/FollowList';
import withAuth from '@/components/common/withAuth';

interface FollowProps {
  followList: FollowItem[];
}

const Following: NextPageWithLayout = ({ followList }: FollowProps) => {
  return (
    <FollowContainer>
      <HeaderBack pageName="팔로잉" />
      <FollowList followList={followList} />
    </FollowContainer>
  );
};

export default withAuth(Following);

const FollowContainer = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh'
}));

export const getServerSideProps = async () => {
  const res = await fetch(
    'https://gist.githubusercontent.com/Ndream-KimYoungHoo/58a617c64f4d8a7cd6ac78bf936e5855/raw/4bae1a105b6db6c8c98117acf363f19c17069867/gistfile1.json'
  );
  // data 자체가 대문자기 때문에 어쩔수 없이 대문자로 destructuring을 함.
  const { FollowListData } = await res.json();
  return {
    props: { followList: FollowListData }
  };
};
