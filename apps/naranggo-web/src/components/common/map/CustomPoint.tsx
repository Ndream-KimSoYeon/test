import React from 'react';
import Image from 'next/image';
import { styled, Box, Snackbar } from '@mui/material';
import { getPointImage, POINT_PIN_NOIMAGE_URL } from '@/utils/image';
import useSnackBar from '@/hooks/useSnackBar';
import Portal from '@/components/common/Portal';

interface CustomPointProps extends CustomMarkerInfor {
  pointName?: string;
}

const CustomPoint = ({ representative, pointName }: CustomPointProps) => {
  const POINT_IMAGE_URL = getPointImage(representative);
  const { snackBarOpen, setSnackBarOpen, handleClose } = useSnackBar();

  return (
    <Wrapper onClick={() => setSnackBarOpen(true)}>
      <Image
        src={POINT_PIN_NOIMAGE_URL}
        alt="포인트 마커"
        layout="fill"
        objectFit="cover"
      />
      {representative !== '' && (
        <StyledPointBtn>
          <Image
            src={POINT_IMAGE_URL}
            alt="대표 이미지"
            layout="fill"
            objectFit="cover"
          />
        </StyledPointBtn>
      )}
      <Portal>
        <PointNameBar
          open={snackBarOpen}
          autoHideDuration={2000}
          onClose={handleClose}
          message={pointName}
        />
      </Portal>
    </Wrapper>
  );
};

export default React.memo(CustomPoint);

const Wrapper = styled(Box)(() => ({
  position: 'absolute',
  width: '40px',
  height: '40px',
  transform: 'translate(-50%, -100%)',
  cursor: 'pointer'
}));

const StyledPointBtn = styled('button')(({ theme }) => ({
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

const PointNameBar = styled(Snackbar)(() => ({
  position: 'fixed',
  bottom: '100px',
  left: '50%',
  transform: 'translateX(-50%)',
  maxWidth: '80%',
  width: 'max-content',
  wordBreak: 'break-word'
}));
