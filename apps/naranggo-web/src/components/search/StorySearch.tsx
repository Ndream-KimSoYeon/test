import theme from '@/utils/theme';
import { Box, Stack, styled, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import Image from 'next/image';

interface UserSearchProps {
  filterData?: StorySearchData[];
}

const StorySearch = ({ filterData }: UserSearchProps) => {
  return (
    <Wrapper>
      <SearchResultWrapper>
        {filterData?.map(({ userId, title, image, like, comment, date }) => (
          <SearchResult key={title}>
            <Stack>
              <StyledTitle>{title}</StyledTitle>
              <StyledDate>{date}</StyledDate>
              <StyledUserId>{userId}</StyledUserId>
              <IconWrapper>
                <IconWrapper>
                  <StyledFavoriteIcon />
                  <StyledText>{like}</StyledText>
                </IconWrapper>
                <IconWrapper>
                  <StyledCommentIcon />
                  <StyledText>{comment}</StyledText>
                </IconWrapper>
              </IconWrapper>
            </Stack>
            <Image
              src={`https://resources-cf.naranggo.com/uploads/${image}`}
              alt={`${userId} 이미지`}
              width={90}
              height={90}
            />
          </SearchResult>
        ))}
      </SearchResultWrapper>
    </Wrapper>
  );
};

export default StorySearch;

const Wrapper = styled(Box)(() => ({
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
}));

const SearchResultWrapper = styled(Stack)(() => ({
  padding: '0 .625rem .625rem'
}));

const SearchResult = styled(Stack)(() => ({
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
