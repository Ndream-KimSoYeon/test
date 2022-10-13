import {
  Box,
  FormControl,
  InputLabel,
  styled,
  Typography,
  Input,
  SelectChangeEvent,
  Select,
  MenuItem
} from '@mui/material';
import { useState, ChangeEvent } from 'react';
import TwoOptionsModal from '../common/Modal/TwoOptionsModal';

interface AvatarSaveModalProps {
  isModalOpen: boolean;
  leftBtnName: string;
  rightBtnName: string;
  avatarFolderList: AvatarFolder[];
  onCloseModal: () => void;
  onClickLeftBtn: () => void;
  onClickRightBtn: () => void;
}

const AvatarSaveModal = ({
  isModalOpen,
  leftBtnName,
  rightBtnName,
  avatarFolderList,
  onCloseModal,
  onClickLeftBtn,
  onClickRightBtn
}: AvatarSaveModalProps) => {
  const [avatarName, setAvatarName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');

  const handleChangeAvatarName = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setAvatarName(target.value);

  const handleChangeSelectOption = ({ target }: SelectChangeEvent<string>) =>
    setSelectedFolder(target.value);

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
        <Message>아바타 이름과 폴더를 결정해주세요.</Message>
        <StyledAvatarNameFormControl variant="standard">
          <InputLabel htmlFor="component-simple">Name</InputLabel>
          <Input
            id="component-simple"
            value={avatarName}
            onChange={handleChangeAvatarName}
          />
        </StyledAvatarNameFormControl>
        <StyledFolderSelectFormControl variant="standard">
          <InputLabel>folder</InputLabel>
          <Select value={selectedFolder} onChange={handleChangeSelectOption}>
            {avatarFolderList.map(({ idavatarfolder, foldername }) => (
              <MenuItem key={idavatarfolder} value={foldername}>
                {foldername}
              </MenuItem>
            ))}
          </Select>
        </StyledFolderSelectFormControl>
      </Wrapper>
    </TwoOptionsModal>
  );
};

export default AvatarSaveModal;

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

const StyledAvatarNameFormControl = styled(FormControl)(() => ({
  margin: '1.4rem 0'
}));

const StyledFolderSelectFormControl = styled(FormControl)(() => ({
  margin: '1rem 0 3.2rem'
}));
