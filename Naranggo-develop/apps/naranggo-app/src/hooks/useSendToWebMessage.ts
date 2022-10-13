import { useCallback } from 'react';
import WebView from 'react-native-webview';

// TODO: web constants.ts에도 동일하게 선언 되어 있음. 추후 monorepo를 적용해야 한 곳에서 const.ts 로 관리할 수 있을 듯
export const APP_TO_WEB_MESSAGE_TYPES = {
  USER_LOCATION: 'USER_LOCATION',
  UUID: 'UUID',
  FCM_TOKEN: 'FCM_TOKEN',
  IMAGE_PICKED: 'IMAGE_PICKED'
} as const;

const useSendToWebMessage = (ref: React.RefObject<WebView<{}>>) => {
  const sendToWebMessage = useCallback(
    (type: keyof typeof APP_TO_WEB_MESSAGE_TYPES, body: any) => {
      if (ref.current) {
        ref.current.postMessage(
          JSON.stringify({
            type,
            body
          })
        );
      }
    },
    [ref]
  );

  return sendToWebMessage;
};
export default useSendToWebMessage;
