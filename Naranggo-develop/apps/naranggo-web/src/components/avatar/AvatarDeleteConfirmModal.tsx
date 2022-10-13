import { Box, styled } from '@mui/material';
import TwoOptionsModal from '../common/Modal/TwoOptionsModal';

interface AvatarDeleteConfirmModalProps {
  isModalOpen: boolean;
  leftBtnName: string;
  rightBtnName: string;
  onCloseModal: () => void;
  onClickLeftBtn: () => void;
  onClickRightBtn: () => void;
}

const AvatarDeleteConfirmModal = ({
  isModalOpen,
  leftBtnName,
  rightBtnName,
  onCloseModal,
  onClickLeftBtn,
  onClickRightBtn
}: AvatarDeleteConfirmModalProps) => {
  return (
    <TwoOptionsModal
      isModalOpen={isModalOpen}
      leftBtnName={leftBtnName}
      rightBtnName={rightBtnName}
      onCloseModal={onCloseModal}
      onClickLeftBtn={onClickLeftBtn}
      onClickRightBtn={onClickRightBtn}
    >
      <Wrapper>정말로 삭제하시겠습니까?</Wrapper>
    </TwoOptionsModal>
  );
};

export default AvatarDeleteConfirmModal;

const Wrapper = styled(Box)(() => ({
  width: '18rem',
  textAlign: 'center',
  margin: '1rem 0.4rem'
}));
