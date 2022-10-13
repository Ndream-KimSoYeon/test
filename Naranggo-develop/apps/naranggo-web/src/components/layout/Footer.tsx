import { Stack, styled } from '@mui/material';

interface FooterProps {
  children: React.ReactNode;
}
const Footer = ({ children }: FooterProps) => {
  return <FooterStack>{children}</FooterStack>;
};

export default Footer;

const FooterStack = styled(Stack)(() => ({
  // Mui 내장 CSS 제어하기 위해 추가
  // overflow: 'hidden'으로 설정하면 검색 영역이 잘리는 현상
  '&>.MuiTabs-root': {
    overflow: 'initial!important'
  },
  '& .MuiTabs-scroller': {
    overflow: 'initial!important'
  },
  zIndex: 9998,
  backgroundColor: '#fff'
}));
