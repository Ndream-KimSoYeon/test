import { Stack, Typography, Button, styled, Avatar } from '@mui/material';
import theme from '@/utils/theme';
import { signIn, signOut } from 'next-auth/react';
import useNRGSession from '@/hooks/useNRGSession';
import { useMutation } from 'react-query';
import { loginNRG } from '@/api/login';
import useNRGuuid from '@/hooks/useNRGuuid';
import useApptoWebMessage from '@/hooks/useAppToWebMessage';
import { WEB_TO_APP_MESSAGE_TYPES } from '@/consts/constants';
import { useEffect } from 'react';
import useProfile from '@/store/useProfile';
import { isEmptyObject } from '@/utils/object';

const LoginTypeEnum = {
  Google: 'google',
  Apple: 'apple',
  Facebook: 'facebook'
} as const;

type LoginType = typeof LoginTypeEnum[keyof typeof LoginTypeEnum];

const ProfileAccountLink = () => {
  const { session, division } = useNRGSession();

  const fcmToken = useApptoWebMessage<string>(
    WEB_TO_APP_MESSAGE_TYPES.FCM_TOKEN
  );
  const uuid = useNRGuuid();

  const [loginProfile, setLoginProfile] = useProfile((state) => [
    state.loginProfile,
    state.setLoginProfile
  ]);

  const { mutate: signInNRG } = useMutation(loginNRG, {
    onSuccess: (data: ApiResponse<LoginProfile>) => {
      setLoginProfile(data.result);
    }
  });

  useEffect(() => {
    if (!!session && !isEmptyObject(session) && !loginProfile.accesstoken) {
      signInNRG({
        division,
        udid: uuid,
        idaccount: session.idaccount,
        fcmtoken: fcmToken || ''
      });
    }
  }, [division, fcmToken, loginProfile.accesstoken, session, signInNRG, uuid]);

  const onClickAuth = async (type: LoginType) => {
    if (!session) {
      await signIn(type);

      return;
    }

    await signOut();
    if (session.provider !== type) {
      await signIn(type);
    }
  };

  return (
    <Wrapper>
      <AccountLinkButton
        variant="contained"
        size="large"
        isActive={session?.provider === LoginTypeEnum.Apple}
        onClick={() => {
          onClickAuth(LoginTypeEnum.Apple);
        }}
      >
        <Avatar src="/images/apple.svg" alt="apple" />
        <Typography>
          애플
          {session?.provider === LoginTypeEnum.Apple
            ? ' 연결됨'
            : ' 연결되지 않음'}
        </Typography>
      </AccountLinkButton>
      <AccountLinkButton
        variant="contained"
        size="large"
        isActive={session?.provider === LoginTypeEnum.Google}
        onClick={() => {
          onClickAuth(LoginTypeEnum.Google);
        }}
      >
        <Avatar src="/images/google.svg" alt="google" />
        <Typography>
          구글
          {session?.provider === LoginTypeEnum.Google
            ? ' 연결됨'
            : ' 연결되지 않음'}
        </Typography>
      </AccountLinkButton>
      <AccountLinkButton
        variant="contained"
        size="large"
        isActive={session?.provider === LoginTypeEnum.Facebook}
        onClick={() => {
          onClickAuth(LoginTypeEnum.Facebook);
        }}
      >
        <Avatar src="/images/facebook_dimmed.svg" alt="facebook" />
        <Typography>
          페이스북
          {session?.provider === LoginTypeEnum.Facebook
            ? ' 연결됨'
            : ' 연결되지 않음'}
        </Typography>
      </AccountLinkButton>
    </Wrapper>
  );
};

export default ProfileAccountLink;

const Wrapper = styled(Stack)(() => ({
  gap: '.625rem',
  margin: '0 1.5rem',
  padding: '1.5rem',
  backgroundColor: theme.palette.custom.light
}));

const AccountLinkButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isActive'
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  textAlign: 'center',
  backgroundColor: isActive
    ? theme.palette.custom.blue
    : theme.palette.custom.grey
}));
