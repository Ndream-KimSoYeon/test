import {
  AppBar,
  IconButton,
  styled,
  Toolbar,
  Typography,
  Stack
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import theme from '@/utils/theme';
import { useRouter } from 'next/router';
interface PageNameProps {
  pageName: string;
  rightButtons?: React.ReactNode;
  onClickBack?: () => void;
}

const HeaderBack = ({ onClickBack, pageName, rightButtons }: PageNameProps) => {
  const router = useRouter();
  return (
    <HeaderContainer position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="backr"
          onClick={() => {
            if (onClickBack) {
              onClickBack();
            } else {
              router.back();
            }
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <HeaderTitle variant="h6">{pageName}</HeaderTitle>
        <RightBtn>{rightButtons}</RightBtn>
      </Toolbar>
    </HeaderContainer>
  );
};

export default HeaderBack;

const HeaderContainer = styled(AppBar)(() => ({
  backgroundColor: theme.palette.custom.blue
}));

const HeaderTitle = styled(Typography)(() => ({
  flexGrow: 1,
  fontWeight: 600,
  textAlign: 'center',
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%, 0)'
}));

const RightBtn = styled(Stack)(() => ({
  position: 'absolute',
  right: '0',
  padding: '.875rem'
}));
