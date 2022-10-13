import ProfileLayout from '@/components/profile/ProfileLayout';
import HeaderBack from '@/components/layout/HeaderBack';
import { Stack, styled } from '@mui/material';
import withAuth from '@/components/common/withAuth';

const Profile: NextPageWithLayout = () => {
  return (
    <ProfileContainer>
      <HeaderBack pageName="프로필 수정" />
      <ProfileLayout />
    </ProfileContainer>
  );
};

export default withAuth(Profile);

const ProfileContainer = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh',
  '& > header': {
    position: 'fixed'
  }
}));
