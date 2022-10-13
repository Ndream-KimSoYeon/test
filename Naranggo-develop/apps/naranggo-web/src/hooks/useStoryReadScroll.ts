import { RefObject, useState } from 'react';
import useScrollToTop from './useScrollToTop';
import helpers from '@/utils/helpers';

type StoryPointInformation = {
  scrollYPosition: number;
  storyPointNodeHeight: number;
} & MapCoordinate;

type UseStoryReadScrollProps = {
  scrollPositionInformation: ScrollPositionInformation;
  markerToStoryPointInformation: MarkerToStoryPointInformation;
  scrollElementRef: RefObject<HTMLDivElement>;
};

const useStoryReadScroll = ({
  scrollPositionInformation,
  markerToStoryPointInformation,
  scrollElementRef
}: UseStoryReadScrollProps) => {
  const {
    isScrollToTopBtnDisplayed,
    changeScrollToTopBtnDisplay,
    scrollToTop
  } = useScrollToTop({
    ref: scrollElementRef
  });

  const [isScrolledByBtn, setIsScrolledByBtn] = useState(false);
  const [mainImageOpacity, setMainImageOpacity] = useState(1);

  const [mapCenter, setMapCenter] = useState({
    lat: 41.00529883763809,
    lng: 28.977183014550175
  });

  const isScrollFinishedTriggeredByBtn = (
    event: React.UIEvent<HTMLDivElement> & { target: HTMLDivElement }
  ) => {
    const {
      scrollHeight,
      clientHeight,
      scrollTop: currentScrollPosition
    } = event.target;

    const { commentListSectionPosition } = scrollPositionInformation;
    const scrollPositionsOfStoryPoints = getOnlyScrollPosition(
      markerToStoryPointInformation
    );

    return (
      clientHeight + currentScrollPosition === scrollHeight ||
      currentScrollPosition === commentListSectionPosition ||
      currentScrollPosition === 0 ||
      scrollPositionsOfStoryPoints.some(
        (scrollPosition) => scrollPosition === currentScrollPosition
      )
    );
  };

  const isNeededToReturnEarly = (
    event: React.UIEvent<HTMLDivElement> & { target: HTMLDivElement }
  ) => {
    const { scrollTop: currentScrollPosition } = event.target;
    const { commentListSectionPosition } = scrollPositionInformation;

    return (
      currentScrollPosition >= commentListSectionPosition || isScrolledByBtn
    );
  };

  const handleScrollTriggeredByUser = (
    event: React.UIEvent<HTMLDivElement> & { target: HTMLDivElement }
  ) => {
    const { scrollTop: currentScrollPosition } = event.target;
    const { mainImageVisibility } = scrollPositionInformation;
    const { isNil } = helpers;

    if (isNil(mainImageVisibility)) {
      const opacityRate = 1 - currentScrollPosition / mainImageVisibility;
      setMainImageOpacity(opacityRate >= 0 ? opacityRate : 0);
    }

    if (
      isNil(mainImageVisibility) &&
      currentScrollPosition > mainImageVisibility
    ) {
      const targetStoryPointInformation = Object.values(
        markerToStoryPointInformation
      ).find(
        ({ scrollYPosition, storyPointNodeHeight }: StoryPointInformation) =>
          currentScrollPosition >= scrollYPosition &&
          currentScrollPosition < scrollYPosition + storyPointNodeHeight
      );

      if (targetStoryPointInformation) {
        const { lat, lng } = targetStoryPointInformation;
        const { lat: currentLat, lng: currentLng } = mapCenter;

        if (currentLat !== lat || currentLng !== lng) {
          setMapCenter({
            lat,
            lng
          });
        }
      }
      return;
    }
  };

  const handleScrollMainContent = (
    event: React.UIEvent<HTMLDivElement> & { target: HTMLDivElement }
  ) => {
    changeScrollToTopBtnDisplay(event);
    // 버튼에 의해서 스크롤이 일어났을 때,
    // 버튼이 의도하는 위치에 스크롤이 도달하게되면 setIsScrolledByBtn을 false로 만듬
    // 그렇지 않으면 TopArea가 변하지 않는 현상이 발생하게됨
    isScrollFinishedTriggeredByBtn(event) && setIsScrolledByBtn(false);
    // 버튼에 의해서 스크롤이 일어났을 때 혹은 댓글 영역 밑에 스크롤이 존재할 때
    // 이후의 로직을 실행하지 않음
    if (isNeededToReturnEarly(event)) {
      return;
    }

    // 유저가 직접 스크롤링 하는 경우, TopArea를 변화시킴(스토리 포인트에 매칭되는 마커를 보여주거나, MainImageOpacity가 바뀜)
    handleScrollTriggeredByUser(event);
  };

  return {
    handleScrollMainContent,
    isScrollToTopBtnDisplayed,
    mainImageOpacity,
    mapCenter,
    setMapCenter,
    setIsScrolledByBtn,
    setMainImageOpacity,
    scrollToTop
  };
};

export default useStoryReadScroll;

const getOnlyScrollPosition = (
  markerToStoryPointInformation: MarkerToStoryPointInformation
) =>
  Object.values(markerToStoryPointInformation).map(
    ({ scrollYPosition }: StoryPointInformation) => scrollYPosition
  );
