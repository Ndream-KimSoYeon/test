import { MouseEvent } from 'react';
import Image from 'next/image';
import { CommonStyles } from '../style/CommonStyles';
import { SEARCH_POINT_PIN_IMAGE_URL } from '@/utils/image';

interface RedMarkerProps {
  onClickMarker?: (e: MouseEvent<HTMLButtonElement>) => void;
  lat: number;
  lng: number;
}

const RedMarker = ({
  onClickMarker,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lat,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lng
}: RedMarkerProps) => {
  return (
    <CommonStyles.MarkerWrapper
      onClick={(e) => onClickMarker && onClickMarker(e)}
    >
      <Image
        src={SEARCH_POINT_PIN_IMAGE_URL}
        alt="포인트 마커"
        layout="fill"
        objectFit="cover"
      />
    </CommonStyles.MarkerWrapper>
  );
};

export default RedMarker;
