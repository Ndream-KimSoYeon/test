import FavoriteIcon from '@mui/icons-material/Favorite';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import MapModal from './MapModal';
import { useState } from 'react';
import { getStoryImage } from '@/utils/image';
import theme from '@/utils/theme';
import {
  styled,
  Card,
  CardActions,
  IconButton,
  Box,
  CardMedia,
  Stack,
  Typography,
  Avatar,
  ListItem
} from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

interface StoryItemsProps {
  storyList: StoryItem[];
  isTopBtn?: boolean;
}

const StoryItems = ({ storyList, isTopBtn }: StoryItemsProps) => {
  const router = useRouter();

  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [mapModalData, setMapModalData] = useState<string>();

  const handleClickStoryReadMove = () => {
    // todo: 스토리에 맞는스토리 읽기 페이지로 이동
    router.push('/story/read/3');
  };

  const handleClickStoryPlaceOpen = (
    e: React.MouseEvent<HTMLButtonElement>,
    contents: string
  ) => {
    e.stopPropagation();
    setIsMapModalOpen(true);
    setMapModalData(contents);
  };

  return (
    <>
      {storyList.map(
        ({
          idblog,
          representative,
          pointcount,
          islike,
          title,
          distance,
          profilepath,
          nickname,
          createdtime,
          likecount,
          replycountsum,
          contents
        }: StoryItem) => (
          <Wrapper key={idblog} onClick={() => handleClickStoryReadMove()}>
            <StoryItem>
              {isTopBtn && (
                <StoryTopArea>
                  <StoryPlaceBtn
                    onClick={(e) => handleClickStoryPlaceOpen(e, contents)}
                  >
                    <FmdGoodIcon />
                    <BoldText>{pointcount}</BoldText>
                  </StoryPlaceBtn>
                  <HeartTopIconBtn>
                    <HeartTopIcon isLike={islike} />
                  </HeartTopIconBtn>
                </StoryTopArea>
              )}
              <CardMedia
                component="img"
                height={isTopBtn? 150 : 120}
                image={getStoryImage('thumbnails50', representative)}
                alt={title}
              />
              <StoryTextArea>
                <AlignWrapper direction="row">
                  <TitleText>{title}</TitleText>
                  <DistanceText>
                    {distance < 1
                      ? Math.floor(distance * 1000) + 'm'
                      : Math.floor(distance) + 'km'}
                  </DistanceText>
                </AlignWrapper>

                <AlignWrapper direction="row">
                  <AlignWrapper direction="row">
                    {/* todo: Avatar 클릭 시 유저 프로필로 이동 */}
                    <Avatar
                      alt={nickname}
                      src={getStoryImage('profile', profilepath)}
                    />
                    <Box>
                      <BoldText>{nickname}</BoldText>
                      <DateText>
                        {dayjs(createdtime.split('T')[0]).format(
                          'YYYY[년] MM[월] DD[일]'
                        )}
                      </DateText>
                    </Box>
                  </AlignWrapper>
                  <StoryBottomBtnArea direction="row">
                    <StoryBottomBtn>
                      <FavoriteIcon fontSize="small" />
                      <StoryBottomBtnText>{likecount}</StoryBottomBtnText>
                    </StoryBottomBtn>
                    <StoryBottomBtn>
                      <SmsOutlinedIcon fontSize="small" />
                      <StoryBottomBtnText>{replycountsum}</StoryBottomBtnText>
                    </StoryBottomBtn>
                  </StoryBottomBtnArea>
                </AlignWrapper>
              </StoryTextArea>
            </StoryItem>
          </Wrapper>
        )
      )}
      {mapModalData && (
        <MapModal
          mapModalData={mapModalData}
          isMapModalOpen={isMapModalOpen}
          setIsMapModalClose={() => setIsMapModalOpen(false)}
        />
      )}
    </>
  );
};

export default StoryItems;

//#region [StoryStyle]
const Wrapper = styled(ListItem)(() => ({
  padding: 0
}));

const StoryItem = styled(Card)(() => ({
  position: 'relative',
  width: '100%',
  margin: '0.5rem auto',
  borderRadius: 5
}));

const StoryTopArea = styled(CardActions)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'absolute',
  width: '100%'
}));

const StoryPlaceBtn = styled(IconButton)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '0.2rem',
  padding: '0.3rem',
  paddingLeft: 0,
  borderRadius: 5,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  color: '#3122ae'
}));

const HeartTopIconBtn = styled(IconButton)(() => ({
  padding: 0
}));

const HeartTopIcon = styled(FavoriteIcon, {
  shouldForwardProp: (prop) => prop !== 'isLike'
})<{ isLike?: number }>(({ isLike, theme }) => ({
  color: isLike ? 'red' : theme.palette.custom.light,
  fontSize: '2rem'
}));

const StoryTextArea = styled(Box)(() => ({
  padding: '0.3rem'
}));

const TitleText = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: '0.8rem'
}));

const DistanceText = styled(Typography)(() => ({
  color: theme.palette.custom.grey3,
  fontSize: '0.5rem',
  fontWeight: 'bold'
}));

const DateText = styled(Typography)(() => ({
  color: theme.palette.custom.grey3,
  fontSize: '0.5rem',
  fontWeight: 'bold'
}));

const StoryBottomBtnArea = styled(Stack)(() => ({
  alignSelf: 'flex-end',
  gap: '0.3rem'
}));

const StoryBottomBtn = styled(Box)(() => ({
  display: 'flex',
  gap: '0.3rem',
  alignItems: 'center',
  '& *': { fontSize: '11px', color: theme.palette.custom.grey3 }
}));

const StoryBottomBtnText = styled(Typography)(() => ({
  padding: 0,
  color: theme.palette.custom.dark,
  fontSize: '0.6rem'
}));

/* 공통 스타일 컴포넌트 */
const AlignWrapper = styled(Stack)(() => ({
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '0.3rem'
}));

const BoldText = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: '0.5rem'
}));
//#endregion [StoryStyle]
