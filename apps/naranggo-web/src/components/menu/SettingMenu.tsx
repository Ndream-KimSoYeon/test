import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack
} from '@mui/material';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { PAGES_URL } from '@/consts/constants';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EditIcon from '@mui/icons-material/Edit';
import GridViewIcon from '@mui/icons-material/GridView';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import GradingIcon from '@mui/icons-material/Grading';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import ProfileInfoArea from '../profile/ProfileInfoArea';

import theme from '@/utils/theme';

const MENUS = [
  { text: '프로필 편집', path: PAGES_URL.PROFILE, icon: <EditIcon /> },
  { text: '내 스토리', path: PAGES_URL.MY_STORY, icon: <GridViewIcon /> },
  { text: '좋아하는 스토리', path: PAGES_URL.FAVORITE, icon: <FavoriteIcon /> },
  {
    text: '스크랩 스토리',
    path: PAGES_URL.SCRAP,
    icon: <GradingIcon />
  },
  { text: '아바타 관리', path: PAGES_URL.AVATAR_MANAGE, icon: <PersonIcon /> },
  { text: '아이템 관리', path: PAGES_URL.ITEM, icon: <InventoryIcon /> },
  {
    text: '차단 리스트 관리',
    path: PAGES_URL.BLOCK_LIST,
    icon: <NoAccountsIcon />
  }
];

const SettingMenu = () => {
  const router = useRouter();

  return (
    <Wrapper>
      <ProfileInfoArea />
      <Box role="presentation">
        <StyledList>
          {MENUS.map(({ text, path, icon }) => (
            <StyledListItem
              key={text}
              onClick={() => {
                if (path) {
                  router.push(path);
                }
              }}
            >
              <ListItemButton>
                {icon}
                <StyledListItemText primary={text} />
                <ChevronRightIcon />
              </ListItemButton>
            </StyledListItem>
          ))}
        </StyledList>
      </Box>
    </Wrapper>
  );
};

export default SettingMenu;

const Wrapper = styled(Stack)(() => ({
  height: '100%'
}));

const StyledList = styled(List)(() => ({
  padding: '0'
}));

const StyledListItem = styled(ListItem)(() => ({
  padding: '0 1rem',
  '& .MuiListItemButton-root': {
    padding: '1rem 0',
    borderBottom: `1px solid ${theme.palette.custom.grey200}`
  },
  '&:first-of-type .MuiListItemButton-root': {
    borderTop: `1px solid ${theme.palette.custom.grey200}`
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.custom.grey
  },
  '& .MuiSvgIcon-root:first-of-type': {
    marginRight: '.625rem'
  }
}));

const StyledListItemText = styled(ListItemText)(() => ({
  '& .MuiListItemText-primary': {
    fontSize: '1rem'
  }
}));
