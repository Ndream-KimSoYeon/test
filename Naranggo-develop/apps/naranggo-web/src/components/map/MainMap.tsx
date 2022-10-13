import { useEffect, useState } from 'react';
import { styled, Box } from '@mui/material';
import GoogleMap from '@/components/common/map/GoogleMap';
import MapBtn from '@/components/common/map/MapBtn';
import UserLocationMarker from './UserPositionMarker';
import {
  CITYHALL_COORDINATE,
  WEB_TO_APP_MESSAGE_TYPES
} from '@/consts/constants';
import useApptoWebMessage from '@/hooks/useAppToWebMessage';

interface MainMapProps {
  children?: React.ReactNode;
  searchResultCoordinate?: MapCoordinate;
  onChangeMap?: (mapChangeInformation: MapChangeInformation) => void;
  moveToCoordinate?: (coordinate: MapCoordinate) => void;
  mapCenter?: MapCoordinate;
  onClickMap?: () => void;
  handleGoogleApiLoaded?: ({
    map,
    maps,
    ref
  }: HandleGoogleApiLoadedParam) => void;
}

const MainMap = ({
  children,
  onChangeMap,
  onClickMap,
  handleGoogleApiLoaded,
  searchResultCoordinate,
  mapCenter = CITYHALL_COORDINATE
}: MainMapProps) => {
  const [userPosition, setUserPosition] = useState(mapCenter);
  const [center, setCenter] = useState<MapCoordinate>();
  const [isMapTypeSatellite, setIsMapTypeSatellite] = useState(false);
  const [isWebViewAccess, setIsWebViewAccess] = useState(false);
  const appToWebMessage = useApptoWebMessage<MapCoordinate>(
    WEB_TO_APP_MESSAGE_TYPES.USER_LOCATION
  );

  const handleChangeMapToUserPosition = () => {
    setCenter(userPosition);
  };

  const handleChangeMapType = () => {
    setIsMapTypeSatellite(!isMapTypeSatellite);
  };

  const handleChangeMap = (mapChangeInformation: MapChangeInformation) => {
    onChangeMap && onChangeMap(mapChangeInformation);
    !isWebViewAccess && findUserPosition();
    setCenter(mapChangeInformation.center);
  };

  const findUserPosition = () =>
    // todo: 실제로 계속 실행시켜주어야 하는지, 아니면 자동으로 추적하는지 확인 필요
    navigator.geolocation.watchPosition(
      ({ coords }) =>
        setUserPosition({
          lat: coords.latitude,
          lng: coords.longitude
        }),
      // todo: 유저가 거절하는 상황에 대해서는 어떻게 처리할지 구체적으로 결정되지 않음
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      {
        enableHighAccuracy: true,
      }
    );

  useEffect(() => {
    if (appToWebMessage) {
      if (!isWebViewAccess) {
        setUserPosition(appToWebMessage);
      } else {
        setUserPosition(appToWebMessage);
        setIsWebViewAccess(true);
        setCenter(userPosition);
      }
    }
  }, [appToWebMessage, isWebViewAccess, userPosition]);

  useEffect(() => {
    setCenter(searchResultCoordinate);
  }, [searchResultCoordinate]);

  const initialChangeMapToUserPositionInWeb = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const userLocation = {
          lat: coords.latitude,
          lng: coords.longitude
        };

        setUserPosition(userLocation);
        setCenter(userLocation);
      },
      // todo: 유저가 거절하는 상황에 대해서는 어떻게 처리할지 구체적으로 결정되지 않음
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      {
        enableHighAccuracy: true,
      }
    );
  };

  useEffect(initialChangeMapToUserPositionInWeb, []);

  return (
    <Wrapper>
      {userPosition && (
      <GoogleMap 
        center={center || userPosition}
        isMapTypeSatellite={isMapTypeSatellite}
        onChangeMap={handleChangeMap}
        onClickMap={onClickMap}
        handleGoogleApiLoaded={handleGoogleApiLoaded}
      >
        {children}
        <UserLocationMarker lat={userPosition.lat} lng={userPosition.lng} />
      </GoogleMap>
      )}
      <ButtonWrapper>
        <MapBtn
          btnType="UserLocation"
          onClickBtn={handleChangeMapToUserPosition}
        />
        <MapBtn
          btnType="MapType"
          isMapTypeSatellite={isMapTypeSatellite}
          onClickBtn={handleChangeMapType}
          style={{
            margin: '16px 0 0 0'
          }}
        />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default MainMap;

const Wrapper = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  position: 'relative'
}));

const ButtonWrapper = styled(Box)(() => ({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  display: 'flex',
  flexDirection: 'column'
}));
