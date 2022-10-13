import HeaderBack from '@/components/layout/HeaderBack';
import { Stack, styled } from '@mui/material';
import ProfileInfoArea from '@/components/profile/ProfileInfoArea';
import StoryList from '@/components/common/storyList/StoryList';
import withAuth from '@/components/common/withAuth';

interface UserProfileProps {
  storyList: StoryItem[];
  nickname: string;
}

const UserProfile: NextPageWithLayout = ({
  storyList,
  nickname
}: UserProfileProps) => {
  return (
    <Wrapper>
      <HeaderBack pageName={nickname} />
      <ProfileInfoArea />
      <StoryList storyList={storyList} />
    </Wrapper>
  );
};

export const getStaticPaths = async () => {
  return {
    fallback: false,
    paths: [
      {
        params: { userProfileId: 'userid' }
      }
    ]
  };
};

export const getStaticProps = async () => {
  // todo: 유저 프로필 정보 가져오기
  const storyList = await fetch(
    'https://gist.githubusercontent.com/Ndream-KimYoungHoo/58a617c64f4d8a7cd6ac78bf936e5855/raw/4bae1a105b6db6c8c98117acf363f19c17069867/gistfile1.json'
  );

  const profile = await fetch(
    'https://gist.githubusercontent.com/Ndream-ChoiDaeWook/8bcf986a76171dea9e7cff05396ae2b3/raw/f4ad8d43dc4eac35fe3d2c15b8f8fbace5c6b965/gistfile1.txt'
  );

  const { StoryListData } = await storyList.json();
  const profileData = await profile.json();
  const { nickname } = profileData;

  return {
    props: { storyList: StoryListData.data, nickname }
  };
};

export default withAuth(UserProfile);

const Wrapper = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh'
}));
