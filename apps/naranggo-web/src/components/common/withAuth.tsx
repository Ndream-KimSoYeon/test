import useAuth from '@/hooks/useAuth';
import React, { useCallback, useEffect } from 'react';
import useSnackBarStore from '@/store/useSnackBarStore';

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P> & NextPageWithLayout
) => {
  if (typeof window === 'undefined') {
    return WrappedComponent;
  }

  const AuthenticatedComponent = ({ ...props }) => {
    const setSnackBarMessage = useSnackBarStore(
      (state) => state.setSnackBarMessage
    );
    const setIsSnackBarOpen = useSnackBarStore(
      (state) => state.setIsSnackBarOpen
    );
    const setSnackBarVertical = useSnackBarStore(
      (state) => state.setSnackBarVertical
    );
    const { isError, error } = useAuth();

    const getErrorMessage = useCallback(() => {
      switch (error?.response?.status) {
        case 500:
          return '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
        default:
          return '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      }
    }, [error]);

    useEffect(() => {
      if (isError) {
        // setIsSnackBarOpen(true);
        // setSnackBarMessage(getErrorMessage());
      }
    }, [
      getErrorMessage,
      isError,
      setSnackBarMessage,
      setSnackBarVertical,
      setIsSnackBarOpen
    ]);

    return (
      <>
        <WrappedComponent {...(props as any)} />
      </>
    );
  };

  if (WrappedComponent.getLayout) {
    AuthenticatedComponent.getLayout = WrappedComponent.getLayout;
  }

  return AuthenticatedComponent;
};

export default withAuth;
