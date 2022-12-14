import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Typography
} from '@mui/material';
import PATHS from '@/consts/paths';
import dayjs from 'dayjs';
import { MoreHoriz } from '@mui/icons-material';
import { useState, MouseEvent } from 'react';
import AvatarDeleteConfirmModal from './AvatarDeleteConfirmModal';
import AvatarFolderChangeModal from './AvatarFolderChangeModal';
import { useRouter } from 'next/router';
import { PAGES_URL } from '@/consts/constants';

interface AvatarItemProps {
  avatarname: string;
  edit_date: string;
  usingnumber: number;
  imgpath: string;
  currentFolder: string;
  avatarFolderList: AvatarFolder[];
}

const AvatarItem = ({
  avatarname,
  edit_date,
  usingnumber,
  imgpath,
  currentFolder,
  avatarFolderList
}: AvatarItemProps) => {
  const [isAvatarFolderChangeModalShown, setIsAvatarFolderChangeModalShown] =
    useState(false);
  const [isAvatarDeleteConfirmModalShown, setIsAvatarDeleteConfirmModalShown] =
    useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClickAvatarEditBtn = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleCloseAvatarEditMenu = () => setAnchorEl(null);

  const handleClickAvatarFolderChangeBtn = () => {
    setAnchorEl(null);
    setIsAvatarFolderChangeModalShown(true);
  };
  const handleCloseAvatarFolderChangeModal = () =>
    setIsAvatarFolderChangeModalShown(false);

  const handleClickAvatarDeleteBtn = () => {
    setAnchorEl(null);
    setIsAvatarDeleteConfirmModalShown(true);
  };
  const handleCloseAvatarDeleteConfirmModal = () =>
    setIsAvatarDeleteConfirmModalShown(false);
  const router = useRouter();

  return (
    <Wrapper>
      <ListItemAvatar>
        <AvatarImage src={PATHS.AVATAR_IMAGE_URL + imgpath} variant="square" />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box>
            <Typography>{avatarname}</Typography>
            <Typography>
              {dayjs(edit_date).format('YYYY??? MM??? DD???')}
            </Typography>
            <Typography>
              {usingnumber === 0
                ? '?????????'
                : usingnumber + '?????? ??????????????? ?????????'}
            </Typography>
          </Box>
        }
      />
      <AvatarEditBtn onClick={handleClickAvatarEditBtn}>
        <MoreHoriz />
      </AvatarEditBtn>
      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseAvatarEditMenu}>
        <MenuItem onClick={() => router.push('/' + PAGES_URL.AVATAR_CREATE)}>
          ??????
        </MenuItem>
        <MenuItem onClick={() => router.push('/' + PAGES_URL.AVATAR_CREATE)}>
          ??????
        </MenuItem>
        <MenuItem onClick={handleClickAvatarFolderChangeBtn}>
          ?????? ??????
        </MenuItem>
        <MenuItem onClick={handleClickAvatarDeleteBtn}>??????</MenuItem>
      </Menu>
      <AvatarFolderChangeModal
        isModalOpen={isAvatarFolderChangeModalShown}
        leftBtnName={'????????????'}
        rightBtnName={'????????????'}
        currentFolder={currentFolder}
        avatarFolderList={avatarFolderList}
        onCloseModal={handleCloseAvatarFolderChangeModal}
        onClickLeftBtn={handleCloseAvatarFolderChangeModal}
        onClickRightBtn={() => {
          // todo : ????????? ?????? ??????
        }}
      />
      <AvatarDeleteConfirmModal
        isModalOpen={isAvatarDeleteConfirmModalShown}
        leftBtnName={'????????????'}
        rightBtnName={'????????????'}
        onCloseModal={handleCloseAvatarDeleteConfirmModal}
        onClickLeftBtn={handleCloseAvatarDeleteConfirmModal}
        onClickRightBtn={() => {
          // todo : ????????? ????????????
        }}
      />
    </Wrapper>
  );
};

export default AvatarItem;

const Wrapper = styled(ListItem)(() => ({
  borderTop: `1px solid #cccccc`,
  position: 'relative',
  padding: '0.2rem 1rem'
}));

const AvatarImage = styled(Avatar)(() => ({
  width: '4rem',
  height: '4rem',
  paddingRight: '0.6rem'
}));

const AvatarEditBtn = styled(IconButton)(() => ({
  position: 'absolute',
  right: 0,
  top: 0
}));
