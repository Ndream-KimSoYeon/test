import { WebViewMessageEvent } from 'react-native-webview';
import Clipboard from '@react-native-community/clipboard';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import { PickerErrorCode, Results } from '../@types/lib';
import RNFS from 'react-native-fs';
import WebView from 'react-native-webview';
import useSendToWebMessage, {
  APP_TO_WEB_MESSAGE_TYPES
} from './useSendToWebMessage';
import useGoBack from '../hooks/useGoBack';


export const WEB_TO_APP_MESSAGE_TYPES = {
  COPY: 'COPY',
  IMAGE_PICKER: 'IMAGE_PICKER',
  NAVIGATION_STATE_CHANGE: 'NAVIGATION_STATE_CHANGE'
} as const;
interface NativeEventData {
  type: keyof typeof WEB_TO_APP_MESSAGE_TYPES;
  body: any;
}

const useReceiveMessage = (ref: React.RefObject<WebView<{}>>) => {
  const sendToWebMessage = useSendToWebMessage(ref);
  const { setIsGoBack } = useGoBack(ref);

  const receiveMessage = ({ nativeEvent }: WebViewMessageEvent) => {
    const { type, body }: NativeEventData = JSON.parse(nativeEvent.data);

    switch (type) {
      case WEB_TO_APP_MESSAGE_TYPES.COPY:
        Clipboard.setString(body);
        break;
      case WEB_TO_APP_MESSAGE_TYPES.IMAGE_PICKER:
        openPicker();
        break;
      case WEB_TO_APP_MESSAGE_TYPES.NAVIGATION_STATE_CHANGE:
        setIsGoBack(nativeEvent.canGoBack);
        break;
    }
  };

  const openPicker = async () => {
    MultipleImagePicker.openPicker({
      mediaType: 'photo'
    })
      .then(async (images: Results[]) => {
        const results = [];
        for (const realPath of images
          .filter((image) => !!image.realPath)
          .map((image) => image.realPath)) {
          if (realPath) {
            results.push(await getFileContent(realPath));
          }
        }
        sendToWebMessage(APP_TO_WEB_MESSAGE_TYPES.IMAGE_PICKED, results);
      })
      .catch((e: PickerErrorCode) => console.log(e));
  };

  const getFileContent = async (path: string) => {
    try {
      const formData = new FormData();
      const contents = await RNFS.readFile(path, 'base64');

      formData.append('image', contents);

      const response: Body = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          Authorization: 'Client-ID 40f0379d3544d92',
          Accept: 'application/json'
        },
        body: formData
      });

      const json = await response.json();

      return json.data.link;
    } catch (e) {
      console.log('error');
    }
  };

  return receiveMessage;
};

export default useReceiveMessage;
