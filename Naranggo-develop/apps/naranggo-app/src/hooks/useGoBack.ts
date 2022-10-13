import WebView from 'react-native-webview';
import { Alert, BackHandler } from 'react-native';
import { useEffect, useState } from 'react';

const applyHistoryChangeListener = `
(function() {
  function wrap(fn) {
    return function wrapper() {
      const res = fn.apply(this, arguments);
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'NAVIGATION_STATE_CHANGE',
        body: window.location.href
      }));
      return res;
    }
  }

  history.pushState = wrap(history.pushState);
  history.replaceState = wrap(history.replaceState);
  window.addEventListener('popstate', function() {
    window.ReactNativeWebView.postMessage(JSON.stringify({
      type: 'NAVIGATION_STATE_CHANGE',
      body: window.location.href
    }));
  });
})();

true;
`;

const useGoBack = (ref: React.RefObject<WebView<{}>>) => {
  const [isGoBack, setIsGoBack] = useState(false);

  useEffect(() => {
    const onClickAndroidBack = () => {
      if (ref.current && isGoBack) {
        ref.current.goBack();
        return true;
      }

      Alert.alert(
        '종료 알림',
        '나랑고 서비스를 종료 하시겠습니까?',
        [
          {
            text: '취소',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: '확인', onPress: () => BackHandler.exitApp() }
        ],
        { cancelable: false }
      );

      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onClickAndroidBack);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onClickAndroidBack);
    };
  }, [isGoBack, ref]);

  return { applyHistoryChangeListener, setIsGoBack };
};

export default useGoBack;
