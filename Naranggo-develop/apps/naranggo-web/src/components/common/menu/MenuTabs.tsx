import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';

const MENU_PATH = {
  map: '/',
  feed: '/feed',
  storyWrite: '/story/write',
  menu: '/menu',
  search: '/search',
  storySearch: '/search/story'
} as const;

const MenuTabs = () => {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(router.pathname);

  useEffect(() => {
    router.prefetch('/');
    router.prefetch('/feed');
    router.prefetch('/search');
    router.prefetch('/search/story');
    router.prefetch('/story/write');
    router.prefetch('/menu');
  });

  useEffect(() => {
    setTabValue(router.pathname);
  }, [router.pathname]);

  return (
    <StyledMenuTabs value={tabValue}>
      <MenuTab
        value={MENU_PATH.map}
        onClick={() => {
          router.push(MENU_PATH.map);
        }}
        icon={<HomeIcon />}
        isActive={tabValue === MENU_PATH.map}
        label="지도"
      />
      <MenuTab
        value={MENU_PATH.feed}
        onClick={() => {
          router.push(MENU_PATH.feed);
        }}
        icon={<StarIcon />}
        isActive={tabValue === MENU_PATH.feed}
        label="피드"
      />
      <SearchMenuTab
        value={MENU_PATH.search}
        onClick={() => {
          router.pathname === '/feed'
            ? router.push(MENU_PATH.storySearch)
            : router.push(MENU_PATH.search);
        }}
        icon={<SearchIcon />}
        label="검색"
      />
      <MenuTab
        sx={{ marginLeft: '20%' }}
        value={MENU_PATH.storyWrite}
        onClick={() => {
          router.push(MENU_PATH.storyWrite);
        }}
        icon={<FavoriteIcon />}
        isActive={tabValue === MENU_PATH.storyWrite}
        label="제작"
      />
      <MenuTab
        value={MENU_PATH.menu}
        onClick={() => {
          router.push(MENU_PATH.menu);
        }}
        icon={<MenuIcon />}
        isActive={tabValue === MENU_PATH.menu}
        label="메뉴"
      />
    </StyledMenuTabs>
  );
};

export default MenuTabs;

const StyledMenuTabs = styled(Tabs)(() => ({
  position: 'relative',
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  borderTop: `3px solid theme.palette.custom.yellow`,
  '& .MuiButtonBase-root:nth-of-type(3)': {
    minWidth: '4.5rem'
  }
}));

const SearchMenuTab = styled(Tab, {
  shouldForwardProp: (prop) => prop !== 'isActive'
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  position: 'absolute',
  top: '-20%',
  left: '50%',
  transform: 'translateX(-50%)',
  maxWidth: '4.5rem',
  color: theme.palette.custom.dark,
  backgroundColor: theme.palette.custom.yellow,
  border: `3px solid theme.palette.custom.light`,
  borderRadius: '50%',
  opacity: '1',
  '& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium': {
    color: theme.palette.custom.dark
  },
  minWidth: '18%',
  fontWeight: isActive ? 'bold' : 'normal',
  '& .MuiSvgIcon-root': {
    width: '1.5rem',
    height: '1.5rem',
    fontSize: '.625rem',
    color: theme.palette.custom.dark
  },
  '&.Mui-selected': {
    color: theme.palette.custom.dark
  }
}));

const MenuTab = styled(Tab, {
  shouldForwardProp: (prop) => prop !== 'isActive'
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  width: '20%',
  minWidth: '20%',
  fontWeight: isActive ? 'bold' : 'normal',
  color: isActive ? theme.palette.custom.blue : theme.palette.custom.grey,
  '& .MuiSvgIcon-root': {
    width: '1.5rem',
    height: '1.5rem',
    fontSize: '.625rem',
    color: isActive ? theme.palette.custom.blue : theme.palette.custom.grey
  }
}));
