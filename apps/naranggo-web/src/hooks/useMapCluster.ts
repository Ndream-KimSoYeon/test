import { useState } from 'react';
import { isNeedToCluster } from '@/utils/mapMath';

const useMapCluster = (storyList: StoryItem[]) => {
  const [clusteredMarkers, setClusteredMarkers] = useState<ClusteredMarker[]>();

  const startCluster = (mapChangeInformation: MapChangeInformation) => {
    const { bounds, center } = mapChangeInformation;

    const mapViewportInformation: MapViewportInformation = {
      lat: center.lat,
      lng: center.lng,
      latDelta: Math.abs(bounds.ne.lat - bounds.se.lat),
      lngDelta: Math.abs(bounds.se.lng - bounds.sw.lng)
    };

    setClusteredMarkers(clusterMarker(storyList, mapViewportInformation));
  };

  return { clusteredMarkers, startCluster };
};

export default useMapCluster;

const clusterMarker = (
  storyList: StoryItem[],
  currentMapCoordinate: MapViewportInformation
) => {
  const markersToCluster: (StoryItem | 'clustered')[] = [...storyList];

  return markersToCluster.reduce(
    (res: ClusteredMarker[], currentMarker: StoryItem | 'clustered', index) => {
      // 현재 방문하는 Marker가 이미 클러스터링 된 경우, 바로 return
      if (currentMarker === 'clustered') {
        return res;
      }

      const {
        lat: currentMarkerLatitude,
        lng: currentMarkerLongitude,
        representative,
        idblog: markerId
      } = currentMarker;

      // res에 push될 baseMarker를 정의
      const baseMarker = {
        markerId,
        representative,
        markerStory: [currentMarker],
        numberOfMarkers: 1,
        lat: currentMarkerLatitude,
        lng: currentMarkerLongitude
      };

      // 현재 index를 제외한, 이후의 index들과 비교할 변수 선언
      // 가령, 길이 10의 배열에서, 현재 인덱스가 0번인 경우, 1번 인덱스부터 비교 진행
      let indexToCompare = index + 1;

      // Cluster되는 Marker의 개수를 카운트함
      let countClusteredMarkers = 1;

      // while문을 통해서 비교
      while (indexToCompare < markersToCluster.length) {
        const targetMarker = markersToCluster[indexToCompare] as StoryItem;

        // Cluster 기준을 결정하는 if문 실행
        if (
          isNeedToCluster(currentMarker, targetMarker, currentMapCoordinate)
        ) {
          baseMarker.markerStory.push(targetMarker);

          countClusteredMarkers += 1;
          markersToCluster[indexToCompare] = 'clustered';
        }

        indexToCompare += 1;
      }

      baseMarker.numberOfMarkers = countClusteredMarkers;
      res.push(baseMarker);

      return res;
    },
    []
  );
};
