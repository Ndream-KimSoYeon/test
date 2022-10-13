import { useState, MouseEvent } from 'react';
import { getStoryImage } from '@/utils/image';
import theme from '@/utils/theme';
import {
  styled,
  Stack,
  Typography,
  ListItem,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import dayjs from 'dayjs';
import Image from 'next/image';
import MyStoryDeleteConfirmModal from './MyStoryDeleteConfirmModal';
import { useRouter } from 'next/router';

interface MyStoryItemsProps {
  storyList: StoryItem[];
}

const MyStoryItems = ({ storyList }: MyStoryItemsProps) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [isMyStoryDeleteConfirmModalOpen, setIsMyStoryDeleteConfirmModalOpen] =
    useState(false);

  const handleCloseStoryMenu = () => setAnchorEl(null);

  const handleClickStoryEditBtn = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickStoryDeleteConfirmModal = () => {
    setIsMyStoryDeleteConfirmModalOpen(true);
  };

  const handleClickStoryDelete = () => {
    // todo 리스트에서 삭제
    console.log('삭제');
    setIsMyStoryDeleteConfirmModalOpen(false);
  };

  const handleClickStoryReadMove = () => {
    router.push('/story/read/3');
  };

  const handleClickStoryEditMove = () => {
    // todo : 해당 스토리의 제작페이지로 이동
    router.push('/story/write');
  };

  return (
    <>
      {storyList.map(
        ({
          idblog,
          representative,
          title,
          nickname,
          createdtime,
          likecount,
          replycountsum
        }: StoryItem) => (
          <Wrapper key={idblog}>
            <StoryList key={title}>
              <Stack>
                <StyledTitle>{title}</StyledTitle>
                <StyledDate>
                  {dayjs(createdtime).format('YYYY년 MM월 DD일')}
                </StyledDate>
                <StyledUserId>{nickname}</StyledUserId>
                <IconWrapper>
                  <IconWrapper>
                    <StyledFavoriteIcon />
                    <StyledText>{likecount}</StyledText>
                  </IconWrapper>
                  <IconWrapper>
                    <StyledCommentIcon />
                    <StyledText>{replycountsum}</StyledText>
                  </IconWrapper>
                </IconWrapper>
              </Stack>
              <MyStoryEditBtnWrapper>
                <MyStoryEditBtn onClick={handleClickStoryEditBtn}>
                  <MoreHoriz />
                </MyStoryEditBtn>
                <Image
                  src={getStoryImage('thumbnails50', representative)}
                  alt={`${title} 이미지`}
                  width={90}
                  height={90}
                />
              </MyStoryEditBtnWrapper>
            </StoryList>
          </Wrapper>
        )
      )}
      <MyStoryDeleteConfirmModal
        isModalOpen={isMyStoryDeleteConfirmModalOpen}
        leftBtnName={'취소하기'}
        rightBtnName={'삭제하기'}
        onCloseModal={() => setIsMyStoryDeleteConfirmModalOpen(false)}
        onClickLeftBtn={() => setIsMyStoryDeleteConfirmModalOpen(false)}
        onClickRightBtn={handleClickStoryDelete}
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseStoryMenu}>
        <MenuItem onClick={handleClickStoryReadMove}>보기</MenuItem>
        <MenuItem onClick={handleClickStoryEditMove}>수정</MenuItem>
        <MenuItem onClick={handleClickStoryDeleteConfirmModal}>삭제</MenuItem>
      </Menu>
    </>
  );
};

export default MyStoryItems;

const Wrapper = styled(ListItem)(() => ({
  display: 'block',
  padding: '0 .625rem'
}));

const StoryList = styled(Stack)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '.625rem 0',
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const StyledTitle = styled(Typography)(() => ({
  fontWeight: 'bold'
}));

const StyledDate = styled(Typography)(() => ({
  color: theme.palette.custom.grey,
  fontSize: '.75rem'
}));

const IconWrapper = styled(Stack)(() => ({
  flexDirection: 'row'
}));

const StyledFavoriteIcon = styled(FavoriteIcon)(() => ({
  width: '.875rem',
  height: '1.25rem',
  color: theme.palette.custom.red
}));

const StyledCommentIcon = styled(SmsOutlinedIcon)(() => ({
  width: '.875rem',
  height: '1.25rem'
}));

const StyledUserId = styled(Typography)(() => ({
  color: theme.palette.custom.grey4,
  fontSize: '.875rem'
}));

const StyledText = styled(Typography)(() => ({
  margin: '0 .25rem',
  fontSize: '.875rem',
  color: theme.palette.text.secondary
}));

const MyStoryEditBtnWrapper = styled(Stack)(() => ({
  flexDirection: 'row'
}));

const MyStoryEditBtn = styled(IconButton)(() => ({
  '& svg': {
    position: 'absolute',
    top: 0,
    right: '.5rem'
  }
}));
