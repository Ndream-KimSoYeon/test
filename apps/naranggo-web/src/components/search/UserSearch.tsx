import theme from '@/utils/theme';
import { Avatar, Box, Stack, styled, Typography } from '@mui/material';

interface UserSearchProps {
  filterData?: UserSearchData[];
}

const UserSearch = ({ filterData }: UserSearchProps) => {
  return (
    <Box>
      <SearchResultWrapper>
        {filterData?.map(({ userId, text, profilepath }) => (
          <SearchResult key={userId}>
            <StyledAvatar
              src={`https://resources-cf.naranggo.com/profiles/${profilepath}`}
              alt={`${userId} 이미지`}
            />
            <TextWrapper>
              <StyledUserId>{userId}</StyledUserId>
              <StyledText>{text}</StyledText>
            </TextWrapper>
          </SearchResult>
        ))}
      </SearchResultWrapper>
    </Box>
  );
};

export default UserSearch;

const StyledAvatar = styled(Avatar)(() => ({
  width: '2.5rem',
  height: '2.5rem'
}));

const SearchResultWrapper = styled(Stack)(() => ({
  padding: '0 .625rem .625rem'
}));

const SearchResult = styled(Stack)(() => ({
  flexDirection: 'row',
  padding: '.625rem 0',
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const TextWrapper = styled(Stack)(() => ({
  marginLeft: '.625rem'
}));

const StyledUserId = styled(Typography)(() => ({
  fontWeight: 'bold'
}));

const StyledText = styled(Typography)(() => ({
  fontSize: '.875rem',
  color: theme.palette.text.secondary
}));
