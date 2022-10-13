import helpers from '@/utils/helpers';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

interface UseStoryReadElementInformation {
  storyPointsWithBlockKey: StoryPointWithBlockKey[];
}

const useStoryReadElementInformation = ({
  storyPointsWithBlockKey
}: UseStoryReadElementInformation) => {
  const [scrollPositionInformation, setScrollPositionInformation] =
    useState<ScrollPositionInformation>({
      mainImageVisibility: 0,
      commentListSectionPosition: 0
    });

  const [markerToStoryPointInformation, setMarkerToStoryPointInformation] =
    useState<MarkerToStoryPointInformation>({});

  const [commentWriteElementHeight, setCommentWriteElementHeight] = useState(0);
  const [commentListRef, setCommentListRef] =
    useState<RefObject<HTMLDivElement> | null>(null);

  const scrollElementRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const commentWriteRef = useRef<HTMLFormElement>(null);
  const storyContentRef = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(() => {
    const profileSectionHeight = profileRef.current?.clientHeight;
    const profileSectionPosition = profileRef.current?.offsetTop;
    const commentListSectionPosition = commentListRef?.current?.offsetTop;
    const storyPointElements = storyContentRef.current?.children;

    const { isNil } = helpers;

    if (
      isNil(commentListSectionPosition) &&
      isNil(profileSectionPosition) &&
      isNil(profileSectionHeight)
    ) {
      setScrollPositionInformation({
        commentListSectionPosition,
        mainImageVisibility: profileSectionPosition + profileSectionHeight - 5
      });
    }

    if (helpers.isNil(storyPointElements)) {
      Array.from(storyPointElements).forEach((storyPointElement, index) => {
        const { Latitude, Longitude } = storyPointsWithBlockKey[index];

        setMarkerToStoryPointInformation((markerToStoryPointInformation) => ({
          ...markerToStoryPointInformation,
          [`${Latitude}-${Longitude}`]: {
            scrollYPosition: (storyPointElement as HTMLDivElement).offsetTop,
            storyPointNodeHeight:
              storyPointElement.getBoundingClientRect().height,
            lat: Latitude,
            lng: Longitude
          }
        }));
      });
    }
  }, [commentListRef, storyPointsWithBlockKey]);

  useEffect(() => {
    setScrollPositionInformation((prevState) => ({
      ...prevState,
      commentListSectionPosition: commentListRef?.current?.offsetTop || 0
    }));
  }, [commentListRef]);

  // 페이지에 진입할 때와, 진입한 후(정확히 말하면 console을 지웠다가 다시 출력하는 경우)
  // 의 scroll 내의 storyPoint의 offsetTop과 storyContentRef의 scrollHeight이 다름
  // 정확한 원인을 모르기 때문에 storyContentRef의 scrollHeight이 바뀔 때 offsetTop 정보를 업데이트하도록 함
  useEffect(() => {
    const storyPointElements = storyContentRef.current?.children;

    if (helpers.isNil(storyPointElements)) {
      Array.from(storyPointElements).forEach((storyPointElement, index) => {
        const { Latitude, Longitude } = storyPointsWithBlockKey[index];

        setMarkerToStoryPointInformation((markerToStoryPointInformation) => ({
          ...markerToStoryPointInformation,
          [`${Latitude}-${Longitude}`]: {
            scrollYPosition: (storyPointElement as HTMLDivElement).offsetTop,
            storyPointNodeHeight:
              storyPointElement.getBoundingClientRect().height,
            lat: Latitude,
            lng: Longitude
          }
        }));
      });
    }
  }, [storyContentRef.current?.scrollHeight, storyPointsWithBlockKey]);

  useEffect(() => {
    const commentWriteSectionHeight = commentWriteRef.current?.clientHeight;
    helpers.isNil(commentWriteSectionHeight) &&
      setCommentWriteElementHeight(commentWriteSectionHeight);

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return {
    scrollPositionInformation,
    markerToStoryPointInformation,
    commentWriteElementHeight,
    storyContentRef,
    scrollElementRef,
    commentListRef,
    profileRef,
    commentWriteRef,
    setCommentListRef,
    setCommentWriteElementHeight
  };
};

export default useStoryReadElementInformation;
