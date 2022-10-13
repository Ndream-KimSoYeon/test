import ListItems from './ListItems';
import { styled, Container } from '@mui/material';
import { PAGES_URL } from '@/consts/constants';

const OfficialList = ({
  officialStoryList,
  koreaIndependence,
  baekje
}: OfficialStoryData) => (
  <OfficialLists>
    <ListItems
      title="전체 공식 스토리 목록"
      text="테스트1"
      storyData={officialStoryList}
      pageUrl={PAGES_URL.OFFICIAL}
      isMore={true}
      isFirst={true}
    />
    <ListItems
      title="대한 독립 만세!"
      text="테스트2"
      isMore={true}
      storyData={koreaIndependence}
      pageUrl={PAGES_URL.OFFICIAL}
    />
    <ListItems
      title="백제의 고도, 송파"
      text="테스트3"
      isMore={true}
      storyData={baekje}
      pageUrl={PAGES_URL.OFFICIAL}
    />
  </OfficialLists>
);

export default OfficialList;

const OfficialLists = styled(Container)(() => ({
  background: 'url(/images/bg.png) no-repeat center top / 100% 50vh'
}));
