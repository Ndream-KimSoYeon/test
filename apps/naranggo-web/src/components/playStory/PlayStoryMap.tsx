import React, { useEffect } from 'react';
import { Box, styled, Typography } from '@mui/material';
import useMapInteraction from '@/hooks/useMapInteraction';
import useUserPosition from '@/hooks/useUserPosition';
import usePlayStoryMap from '@/hooks/usePlayStoryMap';
import useGetDistance from '@/hooks/useGetDistance';
import GoogleMap from '../common/map/GoogleMap';
import UserLocationMarker from '@/components/map/UserPositionMarker';
import CustomPoint from '@/components/common/map/CustomPoint';
import MoveMark from './map/MoveMark';

interface PlayStoryMapProps {
  storyPoints: PlayStoryPoint[];
  blockData: PagesBlock;
}

const PlayStoryMap = ({ storyPoints, blockData }: PlayStoryMapProps) => {
  const { userPosition } = useUserPosition();
  const {
    pointMarkers,
    currentPoint,
    currentPointName,
    mapCenter,
    mapZoom,
    setMapCenter,
    setMapZoom,
    addPoint,
    setIsAddPoint,
    moveMap,
    setIsMove
  } = usePlayStoryMap(storyPoints, userPosition);
  const { getDistance } = useGetDistance(userPosition, currentPoint);
  const { changeZoomByMouseScroll, isMapTypeSatellite } = useMapInteraction({});

  const { lat: userLat, lng: userLng } = userPosition;
  const moveMapType = 'pointName' in blockData;

  useEffect(() => {
    if (moveMapType) {
      moveMap();
      addPoint(blockData);

      return;
    }

    setIsAddPoint(false);
    setIsMove(false);
  }, [addPoint, blockData, moveMapType, moveMap, setIsAddPoint, setIsMove]);

  const handleChangeMap = ({ zoom, center }: MapChangeInformation) => {
    changeZoomByMouseScroll(zoom);
    setMapZoom(zoom);
    setMapCenter(center);
  };

  return (
    <Wrapper>
      {mapCenter && (
        <GoogleMap
          zoom={mapZoom}
          center={mapCenter}
          onChangeMap={handleChangeMap}
          isMapTypeSatellite={isMapTypeSatellite}
        >
          {/* todo: key값 변경 */}
          {pointMarkers.map(({ lat, lng, src }) => {
            return (
              <CustomPoint
                key={`${currentPointName}_${lat}`}
                lat={lat}
                lng={lng}
                representative={src}
              />
            );
          })}
          {moveMapType && currentPoint && (
            <MoveMark lat={currentPoint.lat} lng={currentPoint.lng}>
              <Distance variant="subtitle1" display="block">
                {getDistance()}
              </Distance>
            </MoveMark>
          )}
          {userPosition && <UserLocationMarker lat={userLat} lng={userLng} />}
        </GoogleMap>
      )}
    </Wrapper>
  );
};

export default React.memo(PlayStoryMap);

const Wrapper = styled(Box)(() => ({
  position: 'relative',
  width: '100%',
  height: '100%'
}));

const Distance = styled(Typography)(() => ({
  fontSize: '1.2rem',
  fontWeight: 'bold'
}));
