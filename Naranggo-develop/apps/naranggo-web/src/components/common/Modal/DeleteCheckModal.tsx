import { useRef } from 'react';
import { Stack, styled, Button, Modal, Box } from '@mui/material';
import theme from '@/utils/theme';

interface DeleteCheckModalProps {
  isModalOpen: boolean;
  leftBtnName: string;
  rightBtnName: string;
  onCloseModal: () => void;
  onClickLeftBtn?: () => void;
  onClickRightBtn?: () => void;
}

const DeleteCheckModal = ({
  isModalOpen,
  leftBtnName,
  rightBtnName,
  onCloseModal,
  onClickLeftBtn,
  onClickRightBtn
}: DeleteCheckModalProps) => {
  const modalWrapperRef = useRef(null);

  return (
    <Modal open={isModalOpen} onClose={onCloseModal}>
      <ModalWrapper ref={modalWrapperRef}>
        <Message>정말로 삭제 하시겠습니까?</Message>
        <BtnWrapper>
          <ModalBtn onClick={onClickLeftBtn}>{leftBtnName}</ModalBtn>
          <ModalBtn onClick={onClickRightBtn}>{rightBtnName}</ModalBtn>
        </BtnWrapper>
      </ModalWrapper>
    </Modal>
  );
};

export default DeleteCheckModal;

const ModalWrapper = styled('template')(() => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '1rem',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '.25rem',
  border: 'none'
}));

const ModalBtn = styled(Button)(() => ({
  width: '45%',
  color: theme.palette.custom.light,
  backgroundColor: theme.palette.custom.blue,
  borderRadius: '.25rem !important'
}));

const BtnWrapper = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
}));

const Message = styled(Box)(() => ({
  width: '15rem',
  height: '6em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));
