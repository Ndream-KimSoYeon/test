import ArrowBack from '@mui/icons-material/ArrowBack';
import { IconButton, styled } from '@mui/material';
import { useRouter } from 'next/router';

const BackBtn = () => {
  const router = useRouter();

  return (
    <Wrapper onClick={() => router.back()}>
      <BackIcon />
    </Wrapper>
  );
};

export default BackBtn;

const Wrapper = styled(IconButton)(() => ({
  position: 'absolute',
  top: '6px',
  left: '6px'
}));

const BackIcon = styled(ArrowBack)(() => ({
  fontSize: '2rem',
  color: 'white'
}));
