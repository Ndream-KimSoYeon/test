import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useRef } from 'react';
import { styled, List, IconButton, Container } from '@mui/material';
import useScrollToTop from '@/hooks/useScrollToTop';
import MyStoryItems from './MyStoryItem';

interface MyStoryListProps {
  isFooter?: boolean;
  storyList: StoryItem[];
}

const MyStoryList = ({ isFooter, storyList }: MyStoryListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const {
    isScrollToTopBtnDisplayed,
    changeScrollToTopBtnDisplay,
    scrollToTop
  } = useScrollToTop({
    ref: listRef
  });

  const handleScroll = (
    e: React.UIEvent<HTMLDivElement> & { target: HTMLDivElement }
  ) => {
    changeScrollToTopBtnDisplay(e);
  };

  return (
    <Wrapper onScroll={handleScroll} ref={listRef}>
      <ListContents>
        <MyStoryItems storyList={storyList} />
      </ListContents>
      {isScrollToTopBtnDisplayed && (
        <ScrollTopBtn onClick={scrollToTop} isFooter={isFooter}>
          <ArrowUpwardIcon />
        </ScrollTopBtn>
      )}
    </Wrapper>
  );
};

export default MyStoryList;

const Wrapper = styled(Container)(() => ({
  flex: 1,
  overflowY: 'scroll'
}));

const ListContents = styled(List)(() => ({
  padding: 0
}));

const ScrollTopBtn = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isFooter'
})<{ isFooter?: boolean }>(({ isFooter, theme }) => ({
  position: 'fixed',
  bottom: isFooter ? '5rem' : '1rem',
  right: '1.5rem',
  zIndex: 100,
  backgroundColor: theme.palette.custom.light,
  '&:hover': {
    backgroundColor: theme.palette.custom.light
  },
  boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.2)'
}));
