import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import messaging, {
  FirebaseMessagingTypes
} from '@react-native-firebase/messaging';
// import firebase from '@react-native-firebase/app';

const useFcm = () => {
  const [message, setMessage] =
    useState<FirebaseMessagingTypes.RemoteMessage>();
  const [latestToken, setLatestToken] = useState('');

  useEffect(() => {
    // fcm background message
    // firebase.initializeApp({}, 'naranggo');

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      setMessage(remoteMessage);
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      //  여기에 로직을 작성한다.
      //  remoteMessage.data로 메세지에 접근가능
      //  remoteMessage.from 으로 topic name 또는 message identifier
      //  remoteMessage.messageId 는 메시지 고유값 id
      //  remoteMessage.notification 메시지와 함께 보내진 추가 데이터
      //  remoteMessage.sentTime 보낸시간
    });
  }, []);

  // fcm foreground message
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then((token) => {
        setLatestToken(token);
      });

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    return messaging().onTokenRefresh((token) => {
      setLatestToken(token);
    });
  }, []);

  return { message, fcmToken: latestToken };
};

export default useFcm;
