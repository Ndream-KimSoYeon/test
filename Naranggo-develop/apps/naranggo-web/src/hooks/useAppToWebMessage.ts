import { WEB_TO_APP_MESSAGE_TYPES } from '@/consts/constants';
import { useWebViewAccess } from '@/stores/global';
import { useCallback, useEffect, useState } from 'react';

interface MesasageType {
  type: string;
  body: unknown;
}

type MessageType =
  typeof WEB_TO_APP_MESSAGE_TYPES[keyof typeof WEB_TO_APP_MESSAGE_TYPES];

const useAppToWebMessage = <T>(neededType: MessageType): T => {
  const [appToWebMessage, setAppToWebMessage] = useState<MesasageType>({
    type: '',
    body: null
  });

  const setIsWebViewAccess = useWebViewAccess(
    (state) => state.setIsWebViewAccess
  );

  const handleMessage = useCallback(
    (event: Event) => {
      const { type, body } = JSON.parse((event as MessageEvent).data);

      if (type !== neededType) return;

      setAppToWebMessage({ type, body });
      setIsWebViewAccess(true);
    },
    [neededType, setIsWebViewAccess]
  );

  useEffect(() => {
    document.addEventListener('message', handleMessage);

    return () => {
      document.removeEventListener('message', handleMessage);
      setIsWebViewAccess(false);
    };
  }, [handleMessage, setIsWebViewAccess]);

  return appToWebMessage.body as T;
};

export default useAppToWebMessage;
