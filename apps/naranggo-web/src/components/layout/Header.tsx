import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled } from '@mui/material';
import theme from '@/utils/theme';
import { useRouter } from 'next/router';

interface HeaderProps {
  pageName?: string;
}

const Header = ({ pageName }: HeaderProps) => {
  const router = useRouter();
  return (
    <Wrapper>
      <StyledAppbar>
        <Toolbar>
          <MainHeader>{pageName ? pageName : 'NARANGGO'}</MainHeader>
          <AlarmBtnWrapper>
            <IconButton
              size="large"
              aria-label="new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon
                  onClick={() => {
                    router.push('/mypage/alarm');
                  }}
                />
              </Badge>
            </IconButton>
          </AlarmBtnWrapper>
        </Toolbar>
      </StyledAppbar>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled(Box)(() => ({
  minHeight: '3.5rem'
}));

const StyledAppbar = styled(AppBar)(() => ({
  backgroundColor: theme.palette.custom.blue,
  boxShadow: 'none'
}));

const MainHeader = styled(Typography)(() => ({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  fontSize: '1.25rem',
  textAlign: 'center',
  fontWeight: 'bold'
}));

const AlarmBtnWrapper = styled(Box)(() => ({
  position: 'absolute',
  right: '1rem'
}));
