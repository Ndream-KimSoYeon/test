import Image from 'next/image';
import { styled, Box, Typography } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import PATHS from '@/consts/paths';
import helpers from '@/utils/helpers';

type StoryMainIamgeProps = Pick<
  StoryReadData,
  'representative' | 'pointcount' | 'summary' | 'title'
> & {
  mainImageOpacity: number;
};

const StoryMainImage = ({
  mainImageOpacity,
  representative,
  title,
  pointcount,
  summary
}: StoryMainIamgeProps) => {
  return (
    <Wrapper mainImageOpacity={mainImageOpacity}>
      <Image
        src={PATHS.STORY_REPRESENTATIVE_IMAGE + representative}
        placeholder="blur"
        layout="fill"
        blurDataURL="/images/loading.gif"
        objectFit="cover"
        alt="메인 이미지"
      />
      <StoryInformation>
        <PointCountWrapper>
          <MarkerIcon />
          <PointCount>{pointcount}</PointCount>
        </PointCountWrapper>
        <Title>{title}</Title>
        <Summary>{summary}</Summary>
      </StoryInformation>
    </Wrapper>
  );
};

export default StoryMainImage;

const Wrapper = styled(
  Box,
  helpers.shouldNotForwardProp('mainImageOpacity')
)<{ mainImageOpacity?: number }>(({ mainImageOpacity }) => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  opacity: mainImageOpacity
}));

const StoryInformation = styled(Box)(() => ({
  position: 'absolute',
  bottom: '14px',
  left: '14px'
}));

const Title = styled(Typography)(() => ({
  color: 'white'
}));

const Summary = styled(Typography)(() => ({
  color: 'white'
}));

const MarkerIcon = styled(RoomIcon)(({ theme }) => ({
  color: theme.palette.custom.skyblue,
  fontSize: '1.2rem'
}));

const PointCountWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center'
}));

const PointCount = styled(Typography)(() => ({
  marginLeft: '0.2rem',
  color: 'white'
}));
