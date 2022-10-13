import { Stack, Button, Typography, styled } from '@mui/material';
import theme from '@/utils/theme';
import { useRouter } from 'next/router';
import useNRGSession from '@/hooks/useNRGSession';
import { signOut } from 'next-auth/react';

const Logout = () => {
  const router = useRouter();
  const { session } = useNRGSession();

  return (
    <Wrapper>
      <LogoutButton
        variant="contained"
        onClick={() => {
          if (session) {
            signOut();
            alert('로그아웃 되었습니다.');
            router.push('/');
          }
        }}
      >
        <LogoutTypography>로그아웃</LogoutTypography>
      </LogoutButton>
    </Wrapper>
  );
};

export default Logout;

const Wrapper = styled(Stack)(() => ({
  margin: '1.5rem'
}));

const LogoutButton = styled(Button)(() => ({
  backgroundColor: theme.palette.custom.light
}));

const LogoutTypography = styled(Typography)(() => ({
  color: theme.palette.custom.dark,
  fontWeight: 'bold'
}));
