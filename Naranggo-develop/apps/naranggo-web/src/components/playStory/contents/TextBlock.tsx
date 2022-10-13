import { Stack, styled, Typography } from '@mui/material';
import PATH from '@/consts/paths';

interface TextContentsProps {
  block: TextBlockData;
  wrapperRefHeight?: number;
}

const TextBlock = ({ block, wrapperRefHeight }: TextContentsProps) => {
  return (
    <>
      {block.mode === 'Mode_PictureInclude' && (
        <ImageWrapper height={`calc(100% - ${wrapperRefHeight}px - 56px)`}>
          <ImageContent
            src={PATH.STORY_CONTENT_IMAGE + block.picturePath}
            alt="picture"
          />
        </ImageWrapper>
      )}
      <PlayStoryText>{block.text}</PlayStoryText>
    </>
  );
};

export default TextBlock;

const ImageWrapper = styled(Stack)(() => ({
  position: 'fixed',
  top: '3.5rem',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '90%'
}));

const ImageContent = styled('img')(() => ({
  width: '100%',
  maxHeight: '22rem',
  margin: 'auto 0',
  borderRadius: '.625rem'
}));

const PlayStoryText = styled(Typography)(() => ({
  height: '10rem',
  maxHeight: '10rem',
  padding: '.5rem',
  fontSize: '.875rem',
  whiteSpace: 'pre-wrap',
  overflowY: 'auto'
}));
