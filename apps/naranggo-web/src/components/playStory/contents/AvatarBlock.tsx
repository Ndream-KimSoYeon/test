import theme from '@/utils/theme';
import { styled, Stack, Typography } from '@mui/material';

interface AvatarBlockProps {
  block: AvatarBlockData;
}

const AvatarBlock = ({ block }: AvatarBlockProps) => {
  return (
    <Wrapper>
      <AvatarWrapper>
        <Title>[임시]아바타 페이지 입니다.</Title>
        <Typography>{block.text}</Typography>
      </AvatarWrapper>
    </Wrapper>
  );
};

export default AvatarBlock;

const Wrapper = styled(Stack)(() => ({
  position: 'fixed',
  top: '3.5rem',
  width: '100%',
  height: '100%',
  padding: '.5rem',
  backgroundColor: theme.palette.custom.light
}));

const AvatarWrapper = styled(Stack)(() => ({
  padding: '2rem'
}));

const Title = styled(Typography)(() => ({
  fontSize: '1.2rem',
  marginBottom: '1rem'
}));
