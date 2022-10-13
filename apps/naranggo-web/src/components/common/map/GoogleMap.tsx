import React from 'react';
import GoogleMapReact from 'google-map-react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

interface GoogleMapProps {
  children: React.ReactNode;
  center: MapCoordinate;
  isMapTypeSatellite?: boolean;
  zoom?: number;
  onChangeMap?: (mapChangeInformation: MapChangeInformation) => void;
  onClickChild?: (
    _: MapCoordinate['lat'],
    { lat, lng }: CustomMarkerInfor
  ) => void;
  onClickMap?: () => void;
  handleGoogleApiLoaded?: ({
    map,
    maps,
    ref
  }: HandleGoogleApiLoadedParam) => void;
}

const GOOGLE_MAP_KEY = 'AIzaSyBGzi_7FIpB0h6Mgz5V87hbKqc8e2QJ2hQ';

const GoogleMap = ({
  children,
  center,
  isMapTypeSatellite = false,
  zoom = 15,
  onChangeMap,
  onClickChild,
  onClickMap,
  handleGoogleApiLoaded
}: GoogleMapProps) => {
  const createMapOptions = (
    maps: GoogleMapReact.Maps
  ): GoogleMapReact.MapOptions => ({
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_CENTER
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT,
      style: maps.MapTypeControlStyle.DEFAULT
    },
    scaleControl: true,
    mapTypeControl: false,
    fullscreenControl: false,
    zoomControl: false,
    keyboardShortcuts: false,
    mapTypeId: isMapTypeSatellite ? 'satellite' : 'roadmap'
  });

  return (
    <Wrapper id="map">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: GOOGLE_MAP_KEY,
          libraries: ['geometry', 'places']
        }}
        center={center}
        zoom={zoom}
        onChange={onChangeMap}
        onChildClick={onClickChild}
        options={createMapOptions}
        onClick={onClickMap}
        onGoogleApiLoaded={handleGoogleApiLoaded}
        yesIWantToUseGoogleMapApiInternals
      >
        {children}
      </GoogleMapReact>
    </Wrapper>
  );
};

export default React.memo(GoogleMap);

const Wrapper = styled(Box)({
  width: '100%',
  height: '100%'
});
