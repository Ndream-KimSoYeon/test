import StoryItems from '@/components/common/storyList/StoryItems';
import useScrollToLeft from '@/hooks/useScrollToLeft';
import theme from '@/utils/theme';
import {
  styled,
  List,
  Container,
  Button,
  Stack,
  debounce,
  SwipeableDrawer
} from '@mui/material';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from 'styles/Keyframes.module.css';
import useStoryListDisplay from '@/hooks/useStoryListDisplay';

interface MapStoryListProps {
  storyList: StoryItem[];
  isStoryListOpen: boolean;
  setIsStoryListClose: () => void;
  setIsStoryListOpen: () => void;
}

const MapStoryList = ({
  storyList,
  isStoryListOpen,
  setIsStoryListClose,
  setIsStoryListOpen
}: MapStoryListProps) => {
  const [isActiveSortBtn, setIsActiveSortBtn] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollToLeft } = useScrollToLeft(scrollRef);
  const { sortedList, changeStoryList, btnText, changeSortBtnText } =
    useStoryListDisplay(storyList);

  useEffect(() => {
    scrollToLeft();
    changeStoryList(btnText);
  }, [btnText, scrollToLeft, storyList, changeStoryList]);

  const handleClickSortBtn = debounce(() => {
    // 버튼 클릭 후 keyframes 실행
    setIsActiveSortBtn(!isActiveSortBtn);
    changeSortBtnText(btnText);
  }, 150);

  return (
    <Wrapper
      anchor="bottom"
      open={isStoryListOpen}
      onClose={setIsStoryListClose}
      onOpen={setIsStoryListOpen}
      disableSwipeToOpen={false}
      hideBackdrop={true}
    >
      <SortBtnArea direction="row">
        {sortedList.length > 1 && (
          <SortBtn
            onClick={handleClickSortBtn}
            className={isActiveSortBtn ? styles.bounce_active : ''}
            onAnimationEnd={() => {
              setIsActiveSortBtn(false);
            }}
          >
            {btnText}
          </SortBtn>
        )}
      </SortBtnArea>
      <ScrollRow ref={scrollRef}>
        <ListWrapper>
          <StoryItems storyList={sortedList} />
        </ListWrapper>
      </ScrollRow>
    </Wrapper>
  );
};

export default React.memo(MapStoryList);

const Wrapper = styled(SwipeableDrawer)(() => ({
  position: 'relative',
  '& > div': {
    position: 'fixed',
    bottom: '5.5rem',
    backgroundColor: 'transparent',
    boxShadow: 'none'
  }
}));

const ScrollRow = styled(Container)(() => ({
  display: 'flex',
  overflowX: 'scroll'
}));

const ListWrapper = styled(List)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '0.5rem',
  '& > li': { width: '70vw' },
  padding: 0
}));

const SortBtnArea = styled(Stack)(() => ({
  justifyContent: 'flex-end',
  padding: '0 1rem'
}));

const SortBtn = styled(Button)(() => ({
  width: '20%',
  padding: 0,
  color: theme.palette.custom.grey3,
  fontSize: '0.75rem',
  fontWeight: 'bold',
  border: '1px solid ' + theme.palette.custom.grey3,
  borderRadius: '25px',
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: '#fff'
  }
}));
