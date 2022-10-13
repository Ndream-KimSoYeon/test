import {
  Box,
  FormControl,
  InputLabel,
  styled,
  Typography,
  Input
} from '@mui/material';
import { useState, ChangeEvent } from 'react';
import TwoOptionsModal from '../common/Modal/TwoOptionsModal';

interface AvatarFolderCreateModalProps {
  isModalOpen: boolean;
  leftBtnName: string;
  rightBtnName: string;
  onCloseModal: () => void;
  onClickLeftBtn: () => void;
  onClickRightBtn: () => void;
}

const AvatarFolderCreateModal = ({
  isModalOpen,
  leftBtnName,
  rightBtnName,
  onCloseModal,
  onClickLeftBtn,
  onClickRightBtn
}: AvatarFolderCreateModalProps) => {
  const [folderName, setFolderName] = useState('');

  const handleInputFolderName = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setFolderName(target.value);

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
        <Message>생성할 폴더 이름을 적어주세요</Message>
        <StyledFormControl variant="standard">
          <InputLabel htmlFor="component-simple">Folder Name</InputLabel>
          <Input
            id="component-simple"
            value={folderName}
            onChange={handleInputFolderName}
          />
        </StyledFormControl>
      </Wrapper>
    </TwoOptionsModal>
  );
};

export default AvatarFolderCreateModal;

const Wrapper = styled(Box)(() => ({
  width: '18rem',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  flexDirection: 'column'
}));

const Message = styled(Typography)(() => ({
  textAlign: 'center'
}));

const StyledFormControl = styled(FormControl)(() => ({
  margin: '1.8rem 0'
}));
