import {
  FormControl,
  InputLabel,
  styled,
  Input,
  Typography
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import TwoOptionsModal from '../common/Modal/TwoOptionsModal';

interface FolderNameChangeModalProps {
  isModalOpen: boolean;
  leftBtnName: string;
  rightBtnName: string;
  oldFolderName: string;
  onCloseModal: () => void;
  onClickLeftBtn: () => void;
  onClickRightBtn: () => void;
}

const FolderNameChangeModal = ({
  isModalOpen,
  leftBtnName,
  rightBtnName,
  oldFolderName,
  onCloseModal,
  onClickLeftBtn,
  onClickRightBtn
}: FolderNameChangeModalProps) => {
  const [newFolderName, setNewFolderName] = useState(oldFolderName);

  const handleChangeFolderName = (event: ChangeEvent<HTMLInputElement>) =>
    setNewFolderName(event.target.value);

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
        <Message>폴더 이름을 적어주세요</Message>
        <StyledFormControl variant="standard">
          <InputLabel htmlFor="component-simple">Name</InputLabel>
          <Input
            id="component-simple"
            value={newFolderName}
            onChange={handleChangeFolderName}
          />
        </StyledFormControl>
      </Wrapper>
    </TwoOptionsModal>
  );
};

export default FolderNameChangeModal;

const Wrapper = styled('form')(() => ({
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
  margin: '1.4rem 0 1.8rem'
}));
