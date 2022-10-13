import { useWebViewAccess } from '@/stores/global';

const useWebToAppMessage = () => {
  const isWebViewAccess = useWebViewAccess((state) => state.isWebViewAccess);

  const sendMessage = (type: string, body: string) =>
    isWebViewAccess &&
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type,
        body
      })
    );

  return sendMessage;
};

export default useWebToAppMessage;
