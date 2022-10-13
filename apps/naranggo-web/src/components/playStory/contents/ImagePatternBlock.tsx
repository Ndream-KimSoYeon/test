import theme from '@/utils/theme';
import { styled, Stack, Typography } from '@mui/material';

const ImagePatternBlock = () => {
  return (
    <Wrapper>
      <ImagePatternWrapper>
        <Title>이미지 패턴 확인 페이지 입니다.</Title>
      </ImagePatternWrapper>
    </Wrapper>
  );
};

export default ImagePatternBlock;

const Wrapper = styled(Stack)(() => ({
  position: 'fixed',
  top: '3.5rem',
  width: '100%',
  height: '100%',
  padding: '.5rem',
  backgroundColor: theme.palette.custom.light
}));

const ImagePatternWrapper = styled(Stack)(() => ({
  padding: '2rem'
}));

const Title = styled(Typography)(() => ({
  fontSize: '1.2rem',
  marginBottom: '1rem'
}));
