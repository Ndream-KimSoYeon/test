import ListItems from './ListItems';
import { Container, styled } from '@mui/material';
import { PAGES_URL } from '@/consts/constants';

const FeedList = ({
  officialStoryList,
  koreaIndependence,
  baekje
}: OfficialStoryData) => {
  return (
    <FeedLists>
      <ListItems
        title="추천스토리"
        text="테스트1"
        storyData={officialStoryList}
        isFirst={true}
        pageUrl={PAGES_URL.RECOMMEND}
      />
      <ListItems
        title="공식스토리"
        text="테스트2"
        storyData={koreaIndependence}
        pageUrl={PAGES_URL.OFFICIAL}
      />
      <ListItems
        title="팔로잉스토리"
        text="테스트3"
        storyData={baekje}
        pageUrl={PAGES_URL.FOLLOWING}
      />
    </FeedLists>
  );
};

export default FeedList;

const FeedLists = styled(Container)(() => ({
  background: 'url(/images/bg.png) no-repeat center top / 100% 50vh'
}));
