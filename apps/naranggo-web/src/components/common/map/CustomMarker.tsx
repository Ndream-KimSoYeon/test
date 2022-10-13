import { memo, MouseEvent } from 'react';
import Image from 'next/image';
import { styled, Typography, Box } from '@mui/material';
import { getMarkerImage, POINT_PIN_NOIMAGE_URL } from '@/utils/image';
import { CommonStyles } from '../style/CommonStyles';

interface CustomMarkerProps extends CustomMarkerInfor {
  onClickMarker?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const CustomMarker = ({
  representative,
  numberOfMarkers = 1,
  onClickMarker
}: CustomMarkerProps) => {
  const getNumberOfMarkers = () =>
    numberOfMarkers <= 99 ? numberOfMarkers : '99+';

  return (
    <CommonStyles.MarkerWrapper
      onClick={(e) => onClickMarker && onClickMarker(e)}
    >
      <Image
        src={POINT_PIN_NOIMAGE_URL}
        alt="마커"
        layout="fill"
        objectFit="cover"
      />
      {numberOfMarkers > 1 && (
        <NumberOfMarkersWrapper>
          <NumberOfMarkers>{getNumberOfMarkers()}</NumberOfMarkers>
        </NumberOfMarkersWrapper>
      )}
      {numberOfMarkers <= 1 && representative.length !== 0 && (
        <RepresentativeImageWrapper>
          <Image
            src={getMarkerImage(representative)}
            alt="대표 이미지"
            layout="fill"
            objectFit="cover"
          />
        </RepresentativeImageWrapper>
      )}
    </CommonStyles.MarkerWrapper>
  );
};

export default memo(CustomMarker);

const NumberOfMarkers = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.light,
  fontSize: '0.8rem',
  fontWeight: 'bold'
}));

const RepresentativeImageWrapper = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  position: 'absolute',
  width: '25px',
  height: '25px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: '50%',
  left: '50%',
  top: '2px',
  backgroundColor: theme.palette.custom.blue100,
  transform: 'translateX(-50%)'
}));

const NumberOfMarkersWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '25px',
  height: '25px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: '50%',
  left: '50%',
  top: '2px',
  backgroundColor: theme.palette.custom.blue100,
  transform: 'translateX(-50%)'
}));
