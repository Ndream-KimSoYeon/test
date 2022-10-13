import React from 'react';
import { styled, Modal, Typography, Box, Stack, Button } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import theme from '@/utils/theme';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import OptionHeader from '@/components/common/OptionHeader';
interface ModalProps {
  isModalOpen: boolean;
  setIsModalClose: () => void;
  modalData?: OfficialItemData;
}

const OfficialStoryModal = ({
  isModalOpen,
  setIsModalClose,
  modalData
}: ModalProps) => {
  const router = useRouter();

  if (!modalData) {
    return <></>;
  }

  const {
    idblog,
    summary,
    image,
    name,
    lastmodifiedtime,
    estimatedtime,
    likecount,
    replycountsum
  } = modalData;

  const handleClickPlayBtn = () => {
    setIsModalClose();
    router.push(`/play/${idblog}`);
  };

  const getEstimatedTimeNumberToString = (estimatedtime: number) => {
    switch (estimatedtime) {
      case 0:
        return '예상 소요시간 1시간 이내';
      case 1:
        return '예상 소요시간 1시간 이상';
      default:
        return '예상 소요시간 3시간 이상';
    }
  };

  const estimatedTimeNumberToString =
    getEstimatedTimeNumberToString(estimatedtime);

  return (
    <Modal open={isModalOpen} onClose={setIsModalClose}>
      <ModalContainer>
        <ModalImgArea bgImage={image}>
          <ModalBackground>
            <Box>
              <ModalTitle>{name}</ModalTitle>
              <ModalText>
                {dayjs(lastmodifiedtime).format('YYYY년 MM월 DD일')}
              </ModalText>
              <ModalText>{summary}</ModalText>
            </Box>
            <Box>
              <ModalTimeText>{estimatedTimeNumberToString}</ModalTimeText>
            </Box>
          </ModalBackground>
        </ModalImgArea>
        <OptionHeader
          likecount={likecount}
          replycountsum={replycountsum}
          heightPx="2rem"
        />
        <ModalBottomArea>
          <DirectionsCarIcon fontSize="large" />
          <ModalPlayGuidText>
            플레이 스토리는 현장을 직접 이동하면서
          </ModalPlayGuidText>
          <ModalPlayGuidText>체험하는 스토리 입니다.</ModalPlayGuidText>
          <ModalPlayGuidText>이동 시 안전에 유의해 주세요.</ModalPlayGuidText>
        </ModalBottomArea>
        <ModalPlayBtn onClick={handleClickPlayBtn}>시작하기</ModalPlayBtn>
      </ModalContainer>
    </Modal>
  );
};

export default React.memo(OfficialStoryModal);

const ModalContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  border: '5px solid' + theme.palette.background.paper,
  borderRadius: '4px',
  backgroundColor: theme.palette.background.paper
}));

const ModalImgArea = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'bgImage'
})<{ bgImage?: string }>(({ bgImage }) => ({
  color: theme.palette.custom.light,
  background: 'url(' + bgImage + ') no-repeat center / cover'
}));

const ModalBackground = styled(Stack)(() => ({
  justifyContent: 'space-between',
  gap: '1.5rem',
  minHeight: '15rem',
  padding: '1rem',
  backgroundColor: 'rgba(0,0,0,0.6)',
  fontWeight: 600
}));

const ModalTitle = styled(Typography)(() => ({
  fontWeight: 600
}));

const ModalText = styled(Typography)(() => ({
  marginTop: '0.5rem',
  fontSize: '0.9rem'
}));

const ModalTimeText = styled(Typography)(() => ({
  fontSize: '0.9rem',
  textAlign: 'center'
}));

const ModalBottomArea = styled(Box)(() => ({
  padding: '1rem 0.5rem',
  backgroundColor: '#ddd',
  color: theme.palette.custom.grey4,
  textAlign: 'center'
}));

const ModalPlayGuidText = styled(Typography)(() => ({
  color: theme.palette.custom.grey3,
  fontSize: '0.9rem',
  fontWeight: 600
}));

const ModalPlayBtn = styled(Button)(() => ({
  width: '100%',
  backgroundColor: theme.palette.custom.yellow,
  color: theme.palette.custom.light,
  fontSize: '1.2rem',
  fontWeight: 900,
  '&:hover': {
    backgroundColor: theme.palette.custom.yellow
  }
}));
