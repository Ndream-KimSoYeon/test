import { useState } from 'react';
import { Stack, styled } from '@mui/material';
import SearchTextField from '@/components/search/SearchTextField';
import UserSearch from '@/components/search/UserSearch';
import withAuth from '@/components/common/withAuth';
import useSnackBarStore from '@/store/useSnackBarStore';

interface SearchResultProps {
  userSearchResult: UserSearchData[];
}

const Search: NextPageWithLayout = ({
  userSearchResult
}: SearchResultProps) => {
  const [searchData, setSearchData] = useState('');
  const setSnackBarMessage = useSnackBarStore(
    (state) => state.setSnackBarMessage
  );
  const setIsSnackBarOpen = useSnackBarStore(
    (state) => state.setIsSnackBarOpen
  );

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  const filterData = userSearchResult.filter((search) =>
    search.userId.toLowerCase().includes(searchData.toLowerCase())
  );

  const onClickSearch = () => {
    if (searchData === '') {
      setIsSnackBarOpen(true);
      setSnackBarMessage('검색어를 입력해 주세요.');
    }
    setSearchData('');
  };

  return (
    <Wrapper>
      <SearchTextField
        searchPlaceholder="글 내용, #태그, @작성자 검색"
        onClickSearch={onClickSearch}
        onChangeSearch={onChangeSearch}
        searchData={searchData}
      />
      {searchData && <UserSearch filterData={filterData} />}
    </Wrapper>
  );
};

export default withAuth(Search);

const Wrapper = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh'
}));

export const getServerSideProps = async () => {
  const res = await fetch(
    'https://gist.githubusercontent.com/Ndream-JeongHoYoung/2d8c291919e8b7be79124f8a51d657eb/raw/26710f1b314e4301472615e855e6e84ed78dc74a/gistfile1.json'
  );
  const { userSearchResult } = await res.json();

  return {
    props: { userSearchResult }
  };
};
