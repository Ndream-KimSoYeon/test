import { styled, Box } from '@mui/material';
import GoogleMap from '@/components/common/map/GoogleMap';
import CustomMarker from '@/components/common/map/CustomMarker';
import MapBtn from '@/components/common/map/MapBtn';
import useMapInteraction from '@/hooks/useMapInteraction';

interface StoryReadMapProps {
  mapCenter: MapCoordinate;
  isMapExpanded: boolean;
  storyPointsWithBlockKey: StoryPointWithBlockKey[];
  onChangeMapCenter: (center: MapCoordinate) => void;
  onChangeMapSize: () => void;
  onClickMarker: (
    _: MapCoordinate['lat'],
    { lat, lng }: CustomMarkerInfor
  ) => void;
}

const StoryReadMap = ({
  mapCenter,
  isMapExpanded,
  storyPointsWithBlockKey,
  onChangeMapCenter,
  onChangeMapSize,
  onClickMarker
}: StoryReadMapProps) => {
  const {
    zoom,
    zoomIn,
    zoomOut,
    changeZoomByMouseScroll,
    isMapTypeSatellite,
    changeMapType
  } = useMapInteraction({});

  const handleChangeMap = ({ center, zoom }: MapChangeInformation) => {
    onChangeMapCenter(center);
    changeZoomByMouseScroll(zoom);
  };

  return (
    <Wrapper>
      <GoogleMap
        zoom={zoom}
        center={mapCenter}
        onChangeMap={handleChangeMap}
        onClickChild={onClickMarker}
        isMapTypeSatellite={isMapTypeSatellite}
      >
        {storyPointsWithBlockKey.map(
          ({ Latitude, Longitude, blocks }: StoryPointWithBlockKey) => {
            const pictureBlock = blocks.find(
              (block) => block.type === 'PictureBlockData'
            );

            return (
              <CustomMarker
                key={`${Latitude}-${Longitude}`}
                lat={Latitude}
                lng={Longitude}
                representative={
                  pictureBlock && 'src' in pictureBlock ? pictureBlock.src : ''
                }
              />
            );
          }
        )}
      </GoogleMap>
      <MapBtn
        btnType="ZoomIn"
        onClickBtn={zoomIn}
        style={{
          position: 'absolute',
          right: '1rem',
          top: '1rem'
        }}
      />
      <MapBtn
        btnType="ZoomOut"
        onClickBtn={zoomOut}
        style={{
          position: 'absolute',
          right: '1rem',
          top: '4rem'
        }}
      />
      {!isMapExpanded ? (
        <MapBtn
          btnType="Expand"
          onClickBtn={onChangeMapSize}
          style={{
            position: 'absolute',
            right: '1rem',
            bottom: '1rem'
          }}
        />
      ) : (
        <>
          <MapBtn
            btnType="Shrink"
            onClickBtn={onChangeMapSize}
            style={{
              position: 'absolute',
              right: '1rem',
              bottom: '2rem'
            }}
          />
          <MapBtn
            btnType="MapType"
            onClickBtn={changeMapType}
            isMapTypeSatellite={isMapTypeSatellite}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '7rem'
            }}
          />
        </>
      )}
    </Wrapper>
  );
};

export default StoryReadMap;

const Wrapper = styled(Box)(() => ({
  height: '100%',
  width: '100%',
  position: 'relative'
}));
