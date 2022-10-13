import { useWebViewAccess } from '@/stores/global';

const useSendMessageToDevice = () => {
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

export default useSendMessageToDevice;
