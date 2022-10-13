import FavoriteIcon from '@mui/icons-material/Favorite';
import OfficialStoryModal from '@/components/feed/OfficialStoryModal';
import Portal from '@/components/common/Portal';
import { PAGES_URL } from '@/consts/constants';
import { useState } from 'react';
import {
  styled,
  IconButton,
  Typography,
  CardMedia,
  CardContent,
  Card,
  Stack
} from '@mui/material';
import Image from 'next/image';

interface StoryListProps {
  pageUrl: string;
  storyData: OfficialItemData[];
}

const StoryItems = ({ pageUrl, storyData }: StoryListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<OfficialItemData | undefined>();

  const handleClickStoryItem = ({
    idblog,
    summary,
    image,
    name,
    estimatedtime,
    lastmodifiedtime,
    isfinished,
    likecount,
    replycountsum,
    isLike
  }: OfficialItemData) => {
    if (pageUrl === PAGES_URL.OFFICIAL) {
      setModalData({
        idblog,
        summary,
        image,
        name,
        estimatedtime,
        lastmodifiedtime,
        isfinished,
        likecount,
        replycountsum,
        isLike
      });
      setIsModalOpen(true);
    }
    // todo: 스토리아이템 클릭 시 해당 스토리로 이동해야함
  };

  return (
    <>
      {storyData.map(
        ({
          idblog,
          summary,
          image,
          name,
          estimatedtime,
          lastmodifiedtime,
          isfinished,
          likecount,
          replycountsum,
          isLike
        }: OfficialItemData) => (
          <StoryItemContainer
            key={idblog}
            onClick={() =>
              handleClickStoryItem({
                idblog,
                summary,
                image,
                name,
                estimatedtime,
                lastmodifiedtime,
                isfinished,
                likecount,
                replycountsum,
                isLike
              })
            }
          >
            <StoryItemBtn
              onClick={() => {
                // todo: 좋아요 클릭 시 좋아요 정보 전송 및 아이콘 변경해야함
              }}
            >
              <HeartIcon isLike={isLike} />
            </StoryItemBtn>
            <StoryItemImgContainer>
              <StoryItemImg image={image} />
              {isfinished === 1 && (
                <Image
                  src="/images/icn_stamp.png"
                  alt="stamp"
                  width={60}
                  height={60}
                />
              )}
            </StoryItemImgContainer>
            <StoryItemText>
              <StoryItemTitle>{name}</StoryItemTitle>
            </StoryItemText>
          </StoryItemContainer>
        )
      )}
      {isModalOpen && (
        <Portal>
          <OfficialStoryModal
            isModalOpen={isModalOpen}
            setIsModalClose={() => setIsModalOpen(false)}
            modalData={modalData}
          />
        </Portal>
      )}
    </>
  );
};

export default StoryItems;

const StoryItemContainer = styled(Card)(() => ({
  flex: '0 0 300px',
  position: 'relative',
  borderRadius: 5,
  boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.3)'
}));

const StoryItemBtn = styled(IconButton)(() => ({
  position: 'absolute',
  top: '0',
  right: '0'
}));

const HeartIcon = styled(FavoriteIcon, {
  shouldForwardProp: (prop) => prop !== 'isLike'
})<{ isLike?: boolean }>(({ isLike, theme }) => ({
  color: isLike ? 'red' : theme.palette.custom.light,
  zIndex: '1'
}));

const StoryItemImg = styled(CardMedia)(() => ({
  height: '150px'
}));

const StoryItemTitle = styled(Typography)(() => ({
  fontWeight: 'bold'
}));

const StoryItemText = styled(CardContent)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '0.7rem'
}));

const StoryItemImgContainer = styled(Stack)(() => ({
  position: 'relative',
  '& > span': {
    position: 'absolute !important',
    bottom: 0,
    right: 0
  }
}));
