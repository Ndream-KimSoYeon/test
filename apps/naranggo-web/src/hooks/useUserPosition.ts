import {
  CITYHALL_COORDINATE,
  WEB_TO_APP_MESSAGE_TYPES
} from '@/consts/constants';
import { useEffect, useState } from 'react';
import useApptoWebMessage from './useAppToWebMessage';

const useUserPosition = () => {
  const [userPosition, setUserPosition] =
    useState<MapCoordinate>(CITYHALL_COORDINATE);

  const appToWebMessage = useApptoWebMessage<MapCoordinate>(
    WEB_TO_APP_MESSAGE_TYPES.USER_LOCATION
  );

  const findUserPosition = () => {
    // todo: 실제로 계속 실행시켜주어야 하는지, 아니면 자동으로 추적하는지 확인 필요
    navigator.geolocation.watchPosition(
      ({ coords }) => {
        setUserPosition({
          lat: coords.latitude,
          lng: coords.longitude
        });
      },
      // todo: 유저가 거절하는 상황에 대해서는 어떻게 처리할지 구체적으로 결정되지 않음
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      {
        enableHighAccuracy: true
      }
    );
  };

  const initialChangeMapToUserPositionInWeb = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const userLocation = {
          lat: coords.latitude,
          lng: coords.longitude
        };

        setUserPosition(userLocation);
      },
      // todo: 유저가 거절하는 상황에 대해서는 어떻게 처리할지 구체적으로 결정되지 않음
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      {
        enableHighAccuracy: true
      }
    );
  };

  useEffect(initialChangeMapToUserPositionInWeb, []);

  useEffect(findUserPosition, []);

  useEffect(() => {
    if (appToWebMessage) {
      setUserPosition(appToWebMessage);
    }
  }, [appToWebMessage]);

  return { userPosition, setUserPosition };
};

export default useUserPosition;
