import { Typography } from '@mui/material';
import MapTabs from './MapTabs';
import { useEffect, useState } from 'react';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import MapIcon from '@mui/icons-material/Map';
import MainMap from './MainMap';
import useMapCluster from '@/hooks/useMapCluster';
import CustomMarker from '../common/map/CustomMarker';
import StoryList from '@/components/common/storyList/StoryList';
import MapStoryList from './MapStoryList';

interface MapContentsProps {
  storyList: StoryItem[];
}

const MapContents = ({ storyList }: MapContentsProps) => {
  // TODO: app to web fcm token test 코드이므로 추후 제거 해야 함.

  const [isList, setIsList] = useState(false);
  const { clusteredMarkers, startCluster } = useMapCluster(storyList);
  const [markerStoryList, setMarkerStoryList] =
    useState<StoryItem[]>(storyList);
  const [isStoryListOpen, setIsStoryListOpen] = useState(false);

  // 로그인 사용자 스토리리스트 임시
  // const { session } = useNRGSession();
  // const loginProfile = useProfile((state) => state.loginProfile);

  // const { data } = useQuery<Profile, AxiosError>('getStoryListByUserId', () =>
  //   getStoryListByUserId({
  //     iduser: loginProfile.iduser,
  //     accessToken: loginProfile.accessToken,
  //     lastIdBlog: '-1',
  //     orderType: '1'
  //   })
  // );

  useEffect(() => {
    setIsStoryListOpen(true);
  }, []);

  const handleClickMarker = (
    e: React.MouseEvent<HTMLButtonElement>,
    markerStory: StoryItem[]
  ) => {
    e.stopPropagation();
    setIsStoryListOpen(true);
    setMarkerStoryList(markerStory);
  };

  const handleChangeMap = (mapChangeInformation: MapChangeInformation) => {
    startCluster(mapChangeInformation);
    // todo: 뷰 포트의 값을 서버에 전달하여 추천 스토리 목록 가져와 맵 하단에 뜨게 하기
    // const { ne, nw, sw, se } = mapChangeInformation.bounds;
  };

  return (
    <>
      <MapTabs
        onClickRightTab={() => {
          setIsList(!isList);
        }}
      >
        {isList ? (
          <>
            <MapIcon />
            <Typography>지도</Typography>
          </>
        ) : (
          <>
            <FormatListBulletedRoundedIcon />
            <Typography>리스트</Typography>
          </>
        )}
      </MapTabs>
      {isList ? (
        <StoryList isFooter={true} storyList={storyList} />
      ) : (
        <>
          <MainMap
            onChangeMap={handleChangeMap}
            onClickMap={() => {
              setIsStoryListOpen(false);
            }}
          >
            {clusteredMarkers?.map((markerInformation: ClusteredMarker) => {
              const {
                lat,
                lng,
                markerId,
                representative,
                numberOfMarkers,
                markerStory
              } = markerInformation;

              return (
                <CustomMarker
                  key={markerId}
                  lat={lat}
                  lng={lng}
                  onClickMarker={(e: React.MouseEvent<HTMLButtonElement>) => {
                    markerStory && handleClickMarker(e, markerStory);
                  }}
                  representative={representative}
                  numberOfMarkers={numberOfMarkers ? numberOfMarkers : 1}
                />
              );
            })}
          </MainMap>
          {markerStoryList && (
            <MapStoryList
              storyList={markerStoryList}
              isStoryListOpen={isStoryListOpen}
              setIsStoryListClose={() => setIsStoryListOpen(false)}
              setIsStoryListOpen={() => setIsStoryListOpen(true)}
            />
          )}
        </>
      )}
    </>
  );
};

export default MapContents;
