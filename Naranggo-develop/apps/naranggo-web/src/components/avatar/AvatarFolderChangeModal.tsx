import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Typography,
  SelectChangeEvent
} from '@mui/material';
import { useState } from 'react';
import TwoOptionsModal from '../common/Modal/TwoOptionsModal';

interface AvatarFolderChangeProps {
  isModalOpen: boolean;
  leftBtnName: string;
  rightBtnName: string;
  currentFolder: string;
  avatarFolderList: AvatarFolder[];
  onCloseModal: () => void;
  onClickLeftBtn: () => void;
  onClickRightBtn: () => void;
}

const AvatarFolderChangeModal = ({
  isModalOpen,
  leftBtnName,
  rightBtnName,
  currentFolder,
  avatarFolderList,
  onCloseModal,
  onClickLeftBtn,
  onClickRightBtn
}: AvatarFolderChangeProps) => {
  const [selectedFolder, setSelectedFolder] = useState(currentFolder);

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
        <Message>옮겨갈 폴더를 선택해주세요.</Message>
        <StyledFormControl variant="standard">
          <InputLabel>folder</InputLabel>
          <Select value={selectedFolder} onChange={handleChangeSelectOption}>
            {avatarFolderList.map(({ idavatarfolder, foldername }) => (
              <MenuItem key={idavatarfolder} value={foldername}>
                {foldername}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
      </Wrapper>
    </TwoOptionsModal>
  );
};

export default AvatarFolderChangeModal;

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
  margin: '1.4rem 0 1.8rem'
}));
