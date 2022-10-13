import MenuTabs from '@/components/common/menu/MenuTabs';
import withAuth from '@/components/common/withAuth';
import Footer from '@/components/layout/Footer';
import SearchMap from '@/components/search/SearchMap';
import { Stack, styled } from '@mui/material';

const Search = () => {
  return (
    <Wrapper>
      <SearchMap />
      <Footer>
        <MenuTabs />
      </Footer>
    </Wrapper>
  );
};

export default withAuth(Search);

const Wrapper = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh'
}));
