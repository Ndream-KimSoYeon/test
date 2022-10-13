import React from 'react';
import { styled, Modal, Box } from '@mui/material';
import theme from '@/utils/theme';
import GoogleMap from '@/components/common/map/GoogleMap';
import CustomPoint from '@/components/common/map/CustomPoint';

interface MapModalProps {
  mapModalData: string;
  isMapModalOpen: boolean;
  setIsMapModalClose: () => void;
}

const MapModal = ({
  mapModalData,
  isMapModalOpen,
  setIsMapModalClose
}: MapModalProps) => {
  const pointInformation = JSON.parse(mapModalData).storyPoints;
  const { Latitude: lat, Longitude: lng } = pointInformation[0];

  return (
    <Modal open={isMapModalOpen} onClose={() => setIsMapModalClose()}>
      <ModalWrapper>
        <GoogleMap center={{ lat, lng }}>
          {pointInformation.map(
            (
              { PointName, blocks, Latitude, Longitude }: StoryPoint,
              index: string
            ) => {
              const pointImg = blocks.find((item) =>
                item.type === 'PictureBlockData' ? item.src : ''
              );

              let imageSrc = '';
              if (pointImg?.type === 'PictureBlockData') {
                imageSrc = pointImg.src;
              }

              return (
                <CustomPoint
                  key={PointName + '_' + index}
                  pointName={PointName}
                  lat={Latitude}
                  lng={Longitude}
                  representative={imageSrc}
                />
              );
            }
          )}
        </GoogleMap>
      </ModalWrapper>
    </Modal>
  );
};

export default React.memo(MapModal);

const ModalWrapper = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '85%',
  height: '45%',
  border: '5px solid' + theme.palette.background.paper,
  borderRadius: '4px',
  backgroundColor: theme.palette.background.paper
}));
