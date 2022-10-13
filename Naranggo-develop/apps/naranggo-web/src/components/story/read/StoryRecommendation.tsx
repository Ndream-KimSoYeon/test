import { getStoryRecommendation } from '@/api/story';
import { getStoryImage } from '@/utils/image';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  styled,
  Typography
} from '@mui/material';
import { useQuery } from 'react-query';

const StoryRecommendation = () => {
  const {
    data: storyList,
    isLoading,
    error
  } = useQuery('story-recommendation', getStoryRecommendation);

  if (isLoading || error) {
    return <></>;
  }

  return (
    <Wrapper>
      <Title>추천 Story</Title>
      <ListWrapper>
        {storyList.map(({ idblog, representative, title }: StoryItem) => (
          <StoryItemCardWrapper key={idblog}>
            <StoryItemWrapper>
              <CardMedia
                component="img"
                height="160"
                image={getStoryImage('thumbnails50', representative)}
                alt={title}
              />
              <StoryItemContentWrapper>
                <StoryItemTitle>{title}</StoryItemTitle>
              </StoryItemContentWrapper>
            </StoryItemWrapper>
          </StoryItemCardWrapper>
        ))}
      </ListWrapper>
    </Wrapper>
  );
};

export default StoryRecommendation;

const Wrapper = styled(Box)(({ theme }) => ({
  width: '100vw',
  overflowX: 'scroll',
  padding: '16px 12px',
  backgroundColor: theme.palette.custom.grey200
}));

const Title = styled(Box)(() => ({
  fontWeight: 'bold',
  fontSize: '1.2rem',
  marginBottom: '1.2rem'
}));

const ListWrapper = styled(List)(() => ({
  display: 'flex',
  overflowX: 'scroll'
}));

const StoryItemCardWrapper = styled(ListItem)(() => ({
  padding: 0,
  margin: '0 1rem'
}));

const StoryItemWrapper = styled(Card)(() => ({
  width: '18rem'
}));

const StoryItemContentWrapper = styled(CardContent)(() => ({}));

const StoryItemTitle = styled(Typography)(() => ({}));
