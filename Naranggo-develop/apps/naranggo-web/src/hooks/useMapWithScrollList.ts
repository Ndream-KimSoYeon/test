import {
  ITEM_HEIGHT,
  PROFILE_HEIGHT
} from '@/components/story/write/StoryWritePreview';
import { useState, useEffect } from 'react';

interface MapWithScrollListProps {
  pointList: Point[];
  scrollElementRef: React.RefObject<HTMLElement>;
}

const useMapWithScrollList = ({
  pointList,
  scrollElementRef
}: MapWithScrollListProps) => {
  const [currentMarkerCoordinate, setCurrentMarkerCoordinate] =
    useState<MapCoordinate>();
  const [currentPointIndex, setCurrentPointIndex] = useState(-1);

  useEffect(() => {
    const scrollElementCurrent = scrollElementRef.current;

    if (!scrollElementCurrent) {
      return () => {};
    }

    const scrollListener = () => {
      const pointIndex = Math.floor(
        (scrollElementCurrent.scrollTop - PROFILE_HEIGHT) / ITEM_HEIGHT
      );

      setCurrentPointIndex(pointIndex < 0 ? -1 : pointIndex);
    };

    scrollElementCurrent.addEventListener('scroll', scrollListener);

    return () => {
      if (scrollElementCurrent) {
        scrollElementCurrent.removeEventListener('scroll', scrollListener);
      }
    };
  }, [scrollElementRef]);

  useEffect(() => {
    if (currentPointIndex !== -1) {
      const currentPoint = pointList[currentPointIndex];
      setCurrentMarkerCoordinate({
        lat: currentPoint.lat,
        lng: currentPoint.lng
      });
    }
  }, [currentPointIndex, pointList]);

  return { currentMarkerCoordinate, currentPointIndex };
};

export default useMapWithScrollList;
