import { Stack, styled } from '@mui/material';
import ProfileInfoArea from './ProfileInfoArea';
import ProfileSet from './ProfileSet';

const ProfileLayout = () => {
  return (
    <Wrapper>
      <ProfileInfoArea />
      <ProfileSet />
    </Wrapper>
  );
};

export default ProfileLayout;

const Wrapper = styled(Stack)(() => ({
  height: '100%'
}));
