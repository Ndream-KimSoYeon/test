import MainLayout from '@/components/layout/MainLayout';
import FeedList from '@/components/feed/FeedList';
import withAuth from '@/components/common/withAuth';

const Feed: NextPageWithLayout = ({
  officialStoryList,
  baekje,
  koreaIndependence
}: OfficialStoryData) => {
  return (
    <FeedList
      officialStoryList={officialStoryList}
      baekje={baekje}
      koreaIndependence={koreaIndependence}
    />
  );
};

Feed.getLayout = (page: React.ReactElement) => (
  <MainLayout pageName={'피드'}>{page}</MainLayout>
);

export default withAuth(Feed);

export const getServerSideProps = async () => {
  const res = await fetch(
    'https://gist.githubusercontent.com/Ndream-KimSoYeon/bdea70a32169605c41b62aa8b3dcb285/raw/35f303450c73045ab465ae6aa2deccd681fa80d8/feed'
  );
  const { baekje, koreaIndependence, officialStoryList } = await res.json();

  return {
    props: { baekje, koreaIndependence, officialStoryList }
  };
};
