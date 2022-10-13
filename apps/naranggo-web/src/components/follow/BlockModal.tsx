import {
  Box,
  Stack,
  styled,
  Button,
  Modal,
  Typography,
  ButtonGroup
} from '@mui/material';
import theme from '@/utils/theme';

interface BlockModalProps {
  isModalOpen: boolean;
  nickname: string | undefined;
  iduser: number | undefined;
  onClose: (iduser?: number) => void;
}

const BlockModal = ({
  isModalOpen,
  onClose,
  nickname,
  iduser
}: BlockModalProps) => {
  const removeBlock = () => {
    onClose(iduser);
  };

  const cancel = () => {
    onClose();
  };

  const handleOnClose = () => {
    onClose();
  };

  return (
    <Modal open={isModalOpen} onClose={handleOnClose}>
      <ModalWrapper>
        <ModalText>
          <NickNameText>{nickname}</NickNameText>
          님을 차단 해제하시겠어요?
        </ModalText>
        <AlignWrapper>
          <ModalBtnGroup variant="contained">
            <ModalBtn onClick={() => removeBlock()}>차단 해제</ModalBtn>
            <ModalBtn onClick={() => cancel()}>취소</ModalBtn>
          </ModalBtnGroup>
        </AlignWrapper>
      </ModalWrapper>
    </Modal>
  );
};

export default BlockModal;

const ModalWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '18rem',
  height: '13rem',
  padding: '1rem',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '.25rem',
  border: 'none'
}));

const ModalText = styled(Stack)(() => ({
  width: '90%',
  margin: '0 auto'
}));

const NickNameText = styled(Typography)(() => ({
  display: 'contents',
  fontWeight: 'bold'
}));

const ModalBtnGroup = styled(ButtonGroup)(() => ({
  flexDirection: 'column',
  margin: '0 auto',
  gap: '1rem',
  boxShadow: 'none',
  border: 'none'
}));

const ModalBtn = styled(Button)(() => ({
  width: '10rem',
  color: theme.palette.custom.light,
  backgroundColor: theme.palette.custom.blue,
  borderRadius: '.25rem !important'
}));

const AlignWrapper = styled(Stack)(() => ({
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignSelf: 'center',
  marginTop: '0.5rem'
}));
