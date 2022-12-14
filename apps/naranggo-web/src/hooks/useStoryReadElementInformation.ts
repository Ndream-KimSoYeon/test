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

  // ???????????? ????????? ??????, ????????? ???(????????? ????????? console??? ???????????? ?????? ???????????? ??????)
  // ??? scroll ?????? storyPoint??? offsetTop??? storyContentRef??? scrollHeight??? ??????
  // ????????? ????????? ????????? ????????? storyContentRef??? scrollHeight??? ?????? ??? offsetTop ????????? ????????????????????? ???
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
