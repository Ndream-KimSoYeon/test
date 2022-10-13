import { Box, styled, Typography } from '@mui/material';
import TwoOptionsModal from '../common/Modal/TwoOptionsModal';

interface FolderDeleteConfirmModalProps {
  isModalOpen: boolean;
  leftBtnName: string;
  rightBtnName: string;
  onCloseModal: () => void;
  onClickLeftBtn: () => void;
  onClickRightBtn: () => void;
}

const FolderDeleteConfirmModal = ({
  isModalOpen,
  leftBtnName,
  rightBtnName,
  onCloseModal,
  onClickLeftBtn,
  onClickRightBtn
}: FolderDeleteConfirmModalProps) => {
  return (
    <TwoOptionsModal
      isModalOpen={isModalOpen}
      leftBtnName={leftBtnName}
      rightBtnName={rightBtnName}
      onCloseModal={onCloseModal}
      onClickLeftBtn={onClickLeftBtn}
      onClickRightBtn={onClickRightBtn}
    >
      <Wrapper>
        <Typography>폴더 안의 아바타가 전부 삭제됩니다.</Typography>
        <Typography>정말로 삭제하시겠습니까?</Typography>
      </Wrapper>
    </TwoOptionsModal>
  );
};

export default FolderDeleteConfirmModal;

const Wrapper = styled(Box)(() => ({
  width: '18rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  margin: '1rem 0.4rem'
}));
