import { useState } from 'react';
import { Stack, styled } from '@mui/material';
import SearchTextField from '@/components/search/SearchTextField';
import StorySearch from '@/components/search/StorySearch';
import withAuth from '@/components/common/withAuth';
import useSnackBarStore from '@/store/useSnackBarStore';

interface StorySearchResultProps {
  storySearchResult: StorySearchData[];
}

const Story: NextPageWithLayout = ({
  storySearchResult
}: StorySearchResultProps) => {
  const [searchData, setSearchData] = useState('');
  const setIsSnackBarOpen = useSnackBarStore(
    (state) => state.setIsSnackBarOpen
  );
  const setSnackBarMessage = useSnackBarStore(
    (state) => state.setSnackBarMessage
  );

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchData(e.target.value);
  };

  const filterData = storySearchResult.filter(
    (search) =>
      search.title.toLowerCase().includes(searchData.toLowerCase()) ||
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
        searchData={searchData}
        onClickSearch={onClickSearch}
        onChangeSearch={onChangeSearch}
      />
      {searchData && <StorySearch filterData={filterData} />}
    </Wrapper>
  );
};

export default withAuth(Story);

const Wrapper = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh'
}));

export const getServerSideProps = async () => {
  const res = await fetch(
    'https://gist.githubusercontent.com/Ndream-JeongHoYoung/2d8c291919e8b7be79124f8a51d657eb/raw/ef2317dc565f18e64e0ff10f135ed49915aa933a/gistfile1.json'
  );
  const { storySearchResult } = await res.json();

  return {
    props: { storySearchResult }
  };
};
