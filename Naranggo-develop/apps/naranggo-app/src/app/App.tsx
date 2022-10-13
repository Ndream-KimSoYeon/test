/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, { useEffect, useRef } from 'react';
import WebView from 'react-native-webview';
import { SafeAreaView, Alert } from 'react-native';
import useFcm from '../hooks/useFcm';
import useUuid from '../hooks/useUuid';
import useLocation from '../hooks/useLocation';
import useReceiveMessage from '../hooks/useReceiveMessage';
import { request, PERMISSIONS } from 'react-native-permissions';
import useSendToWebMessage, {
  APP_TO_WEB_MESSAGE_TYPES
} from '../hooks/useSendToWebMessage';
import useGoBack from '../hooks/useGoBack';

const MyWeb = () => {
  const ref = useRef<WebView>(null);
  const uuid = useUuid();
  const { message, fcmToken } = useFcm();
  const { latitude, longitude } = useLocation();
  const receiveMessage = useReceiveMessage(ref);
  const sendToWebMessage = useSendToWebMessage(ref);
  const { applyHistoryChangeListener } = useGoBack(ref);

  useEffect(() => {
    request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((result) => {
      console.log(result);
    });
  }, []);

  useEffect(() => {
    if (message) {
      Alert.alert(message.data?.title || '', message.data?.body);
      // TODO: ref.current?.postMessage(message); 추후 push 메시지를 UI에서 처리할 때 사용
    }

    if (fcmToken) {
      sendToWebMessage(APP_TO_WEB_MESSAGE_TYPES.FCM_TOKEN, fcmToken);
    }
  }, [message, fcmToken, sendToWebMessage]);

  useEffect(() => {
    if (latitude && longitude) {
      sendToWebMessage(APP_TO_WEB_MESSAGE_TYPES.USER_LOCATION, {
        lat: latitude,
        lng: longitude
      });
    }
  }, [latitude, longitude, sendToWebMessage]);

  const handleOnLoadProgress = () => {
    sendToWebMessage(APP_TO_WEB_MESSAGE_TYPES.UUID, uuid);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        nativeConfig={{ props: { webContentsDebuggingEnabled: true } }}
        ref={ref}
        onMessage={receiveMessage}
        source={{
          uri: 'http://10.0.2.2:3000/'
        }}
        onLoadProgress={handleOnLoadProgress}
        onLoadStart={() => ref.current.injectJavaScript(applyHistoryChangeListener)}
      />
    </SafeAreaView>
  );
};

export default MyWeb;
