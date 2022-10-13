import { useEffect, useState } from 'react';

const useNRGuuid = () => {
  const [UUID, setUUID] = useState(process.env.NEXT_PUBLIC_UUID);

  /**
   *
   * RN 웹뷰에서 message event를 통해 데이터를 전달하고 나랑고 web에서 message event의 listener 등록을 통해 설정하게 되는데,
   * 이 message를 통해서 uuid뿐만아니라 다양한 데이터들이 넘어올 수 있음.
   * 따라서 type string check를 하고 RN webview에서 prefix로 넣어둔 데이터를 체크하여 맞다면 uuid를 세팅해줌
   *
   */
  useEffect(() => {
    //android
    document.addEventListener('message', (e: Event) => {
      const data = (e as MessageEvent).data;

      if (typeof data === 'string') {
        if (data.startsWith('NRG_UUID')) {
          setUUID(data.split('=')[1]);
        }
      }
    });

    //ios
    window.addEventListener('message', (e) => {
      const data = (e as MessageEvent).data;

      if (typeof data === 'string') {
        if (data.startsWith('NRG_UUID')) {
          setUUID(data.split('=')[1]);
        }
      }
    });
  }, []);

  return UUID;
};

export default useNRGuuid;
