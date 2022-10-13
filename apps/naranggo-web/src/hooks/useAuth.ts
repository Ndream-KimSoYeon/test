import { loginNRG } from '@/api/login';
import { WEB_TO_APP_MESSAGE_TYPES } from '@/consts/constants';
import useProfile from '@/store/useProfile';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import useApptoWebMessage from './useAppToWebMessage';
import useNRGSession from './useNRGSession';
import useNRGuuid from './useNRGuuid';

const useAuth = () => {
  const { session, division, status } = useNRGSession();

  const fcmToken = useApptoWebMessage<string>(
    WEB_TO_APP_MESSAGE_TYPES.FCM_TOKEN
  );
  const uuid = useNRGuuid();

  const [loginProfile, setLoginProfile, initLoginProfile] = useProfile(
    (state) => [
      state.loginProfile,
      state.setLoginProfile,
      state.initLoginProfile
    ]
  );

  const {
    mutate: signInNRG,
    isLoading,
    isError,
    error,
    isSuccess
  } = useMutation<ApiResponse<LoginProfile>, AxiosError, LoginParams>(
    loginNRG,
    {
      onSuccess: (data) => {
        console.log('login response: ', data, data.result);
        setLoginProfile(data.result);
      },
      onError: () => {
        initLoginProfile();
      }
    }
  );

  useEffect(() => {
    if (!loginProfile.accesstoken && status !== 'loading') {
      signInNRG({
        division,
        udid: uuid,
        idaccount: session?.idaccount || '',
        fcmtoken: fcmToken || ''
      });
    }
  }, [
    fcmToken,
    division,
    loginProfile.accesstoken,
    session?.idaccount,
    signInNRG,
    uuid,
    status
  ]);

  return { loginProfile, isLoading, isError, error, isSuccess };
};

export default useAuth;
