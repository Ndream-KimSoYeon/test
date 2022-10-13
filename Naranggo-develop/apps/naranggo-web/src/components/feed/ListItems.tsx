import StoryItems from './StoryItems';
import { useRouter } from 'next/router';
import { styled, List, Box, Typography, Button, ListItem } from '@mui/material';

interface OfficialStoryProps {
  title: string;
  text: string;
  pageUrl: string;
  isMore?: boolean;
  isFirst?: boolean;
  storyData: OfficialItemData[];
}

const ListItems = ({
  title,
  text,
  storyData,
  pageUrl,
  isMore,
  isFirst
}: OfficialStoryProps) => {
  const router = useRouter();

  const handleClickRouteMove = () => {
    router.push(pageUrl);
  };

  return (
    <List>
      <ListTitleContainer isFirst={isFirst}>
        <Box>
          <ListTitle>{title}</ListTitle>
          <Typography>{text}</Typography>
        </Box>
        {!isMore && (
          <ListMoreBtn isFirst={isFirst} onClick={handleClickRouteMove}>
            더보기
          </ListMoreBtn>
        )}
      </ListTitleContainer>
      <StoryItemContents>
        <StoryItems pageUrl={pageUrl} storyData={storyData} />
      </StoryItemContents>
    </List>
  );
};

export default ListItems;

const ListTitleContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isFirst'
})<{ isFirst?: boolean }>(({ isFirst, theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  color: isFirst ? theme.palette.custom.light : theme.palette.custom.dark
}));

const ListMoreBtn = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isFirst'
})<{ isFirst?: boolean }>(({ isFirst, theme }) => ({
  justifyContent: 'flex-end',
  padding: 0,
  color: isFirst ? theme.palette.custom.light : theme.palette.custom.dark
}));

const ListTitle = styled(Typography)(() => ({
  fontSize: '1rem',
  fontWeight: 'bold'
}));

const StoryItemContents = styled(ListItem)(() => ({
  alignItems: 'stretch',
  gap: '1rem',
  overflowX: 'scroll',
  padding: '1rem 0'
}));
