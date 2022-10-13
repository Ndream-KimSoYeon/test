import withAuth from '@/components/common/withAuth';
import OfficialList from '@/components/feed/OfficialList';
import HeaderBack from '@/components/layout/HeaderBack';
import { Stack, styled } from '@mui/material';

const Official: NextPageWithLayout = ({
  officialStoryList,
  baekje,
  koreaIndependence
}: OfficialStoryData) => {
  return (
    <OfficialContainer>
      <HeaderBack pageName="공식 스토리" />
      <OfficialContents>
        <OfficialList
          officialStoryList={officialStoryList}
          baekje={baekje}
          koreaIndependence={koreaIndependence}
        />
      </OfficialContents>
    </OfficialContainer>
  );
};

export default withAuth(Official);

const OfficialContainer = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh'
}));

const OfficialContents = styled(Stack)(() => ({
  flex: 1,
  gap: '0.5rem',
  overflowY: 'scroll'
}));

export const getStaticProps = async () => {
  const res = await fetch(
    'https://gist.githubusercontent.com/Ndream-KimSoYeon/bdea70a32169605c41b62aa8b3dcb285/raw/35f303450c73045ab465ae6aa2deccd681fa80d8/feed'
  );
  const { baekje, koreaIndependence, officialStoryList } = await res.json();

  return {
    props: { baekje, koreaIndependence, officialStoryList }
  };
};
