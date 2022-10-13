import React, { useState } from 'react';
import { styled, Box } from '@mui/material';
import BackBtn from '@/components/story/read/BackBtn';
import StoryMainImage from '@/components/story/read/StoryMainImage';
import OptionHeader from '@/components/common/OptionHeader';
import Profile from '@/components/story/read/Profile';
import StoryContent from '@/components/story/read/StoryContent';
import Comment from '@/components/story/read/Comment/Comment';
import ScrollToTopBtn from '@/components/common/btn/ScrollToTopBtn';
import CommentWrite from '@/components/story/read/Comment/CommentWrite';
import helpers from '@/utils/helpers';
import { nanoid } from 'nanoid';
import StoryReadMap from '@/components/story/read/StoryReadMap';
import useMapInteraction from '@/hooks/useMapInteraction';
import useStoryReadScroll from '@/hooks/useStoryReadScroll';
import useStoryReadElementInformation from '@/hooks/useStoryReadElementInformation';
import StoryRecommendation from '@/components/story/read/StoryRecommendation';
import withAuth from '@/components/common/withAuth';
interface StoryReadPageProps {
  storyReadData: StoryReadData;
}

const StoryReadPage = ({ storyReadData }: StoryReadPageProps) => {
  const {
    representative,
    likecount,
    replycountsum,
    profilepath,
    nickname,
    isfollow,
    contents,
    createdtime,
    pointcount,
    summary,
    title
  } = storyReadData;

  // todo: 추후 getStaticProps에서 가공하기
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [storyPointsWithBlockKey, setStoryPointsWithBlockKey] = useState(
    reformatStoryPoints(JSON.parse(contents))
  );

  const [selectedCommentToReply, setSelectedCommentToReply] =
    useState<SelectedCommentToReply | null>(null);

  const { isMapExpanded, changeMapSize } = useMapInteraction({
    isMapExpanded: false
  });

  const {
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
  } = useStoryReadElementInformation({ storyPointsWithBlockKey });

  const {
    mainImageOpacity,
    handleScrollMainContent,
    isScrollToTopBtnDisplayed,
    mapCenter,
    setMapCenter,
    setIsScrolledByBtn,
    setMainImageOpacity,
    scrollToTop
  } = useStoryReadScroll({
    scrollPositionInformation,
    markerToStoryPointInformation,
    scrollElementRef
  });

  const handleClickScrollToTopBtn = () => {
    setIsScrolledByBtn(true);
    setMainImageOpacity(1);
    scrollToTop();
    setMapCenter(
      getMarkerCoordinateOfFirstStoryPoint(markerToStoryPointInformation)
    );
  };

  const handleClickScrollToCommentSection = () => setIsScrolledByBtn(true);

  const handleClickMarker = (
    _: MapCoordinate['lat'],
    { lat, lng }: CustomMarkerInfor
  ) => {
    isMapExpanded && changeMapSize();
    setIsScrolledByBtn(true);

    const { scrollYPosition } = markerToStoryPointInformation[`${lat}-${lng}`];
    helpers.scrollTo(scrollElementRef, scrollYPosition);

    setMapCenter({
      lat,
      lng
    });
  };

  return (
    <>
      <TopAreaWrapper isMapExpanded={isMapExpanded}>
        <ImageWrapper isMapExpanded={isMapExpanded}>
          <StoryReadMap
            mapCenter={mapCenter}
            isMapExpanded={isMapExpanded}
            storyPointsWithBlockKey={storyPointsWithBlockKey}
            onChangeMapCenter={setMapCenter}
            onClickMarker={handleClickMarker}
            onChangeMapSize={changeMapSize}
          />
          {Boolean(mainImageOpacity) && (
            <StoryMainImage
              mainImageOpacity={mainImageOpacity}
              representative={representative}
              title={title}
              pointcount={pointcount}
              summary={summary}
            />
          )}
        </ImageWrapper>
        <OptionHeader
          commentListRef={commentListRef}
          likecount={likecount}
          replycountsum={replycountsum}
          onClickScrollToCommentSection={handleClickScrollToCommentSection}
        />
        <BackBtn />
      </TopAreaWrapper>
      <BottomAreaWrapper
        ref={scrollElementRef}
        commentWriteHeight={commentWriteElementHeight}
        onScroll={handleScrollMainContent}
      >
        <Profile
          profileRef={profileRef}
          profilepath={profilepath}
          nickname={nickname}
          isfollow={isfollow}
          createdtime={createdtime}
        />
        <StoryContent
          storyContentRef={storyContentRef}
          storyPointsWithBlockKey={storyPointsWithBlockKey}
        />
        <Comment
          onLayoutCommentList={setCommentListRef}
          selectedCommentToReply={selectedCommentToReply}
          onReplyComment={setSelectedCommentToReply}
        />
        <StoryRecommendation />
      </BottomAreaWrapper>
      {!isMapExpanded && (
        <>
          <ScrollToTopBtn
            isScrollToTopBtnDisplayed={isScrollToTopBtnDisplayed}
            marginBetweenBottom={commentWriteElementHeight}
            onClickScrollToTopBtn={handleClickScrollToTopBtn}
          />
          <CommentWrite
            commentWriteRef={commentWriteRef}
            selectedCommentToReply={selectedCommentToReply}
            onCancleReplyComment={setSelectedCommentToReply}
            onChangeCommentWriteElementHeight={setCommentWriteElementHeight}
          />
        </>
      )}
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    fallback: false,
    paths: [
      {
        params: { storyReadId: '3' }
      }
    ]
  };
};

export const getStaticProps = async () => {
  const res = await fetch(
    'https://gist.githubusercontent.com/Ndream-KimYoungHoo/58a617c64f4d8a7cd6ac78bf936e5855/raw/4bae1a105b6db6c8c98117acf363f19c17069867/gistfile1.json'
  );

  const { StoryReadData } = await res.json();

  return {
    props: {
      storyReadData: StoryReadData
    }
  };
};

export default withAuth(StoryReadPage);

const TopAreaWrapper = styled(
  Box,
  helpers.shouldNotForwardProp('isMapExpanded')
)<{ isMapExpanded?: boolean }>(({ isMapExpanded }) => ({
  position: 'fixed',
  height: isMapExpanded ? '100%' : '30%',
  width: '100%',
  zIndex: 1
}));

const ImageWrapper = styled(
  Box,
  helpers.shouldNotForwardProp('isMapExpanded')
)<{ isMapExpanded?: boolean }>(({ isMapExpanded }) => ({
  height: isMapExpanded ? '100%' : '85%',
  position: 'relative'
}));

const BottomAreaWrapper = styled(
  Box,
  helpers.shouldNotForwardProp('commentWriteHeight')
)<{ commentWriteHeight?: number }>(({ commentWriteHeight }) => ({
  position: 'absolute',
  top: '30%',
  bottom: commentWriteHeight,
  overflowY: 'scroll'
}));

const reformatStoryPoints = (
  storyContents: StoryContents
): StoryPointWithBlockKey[] => {
  const { storyPoints } = storyContents;

  storyPoints.forEach((storyPoint: StoryPoint) => {
    storyPoint.blocks = storyPoint.blocks.map((block: Block) => ({
      ...block,
      blockId: nanoid()
    }));
  });

  return storyPoints as StoryPointWithBlockKey[];
};

const getMarkerCoordinateOfFirstStoryPoint = (
  markerToStoryPointInformation: MarkerToStoryPointInformation
) => {
  const [firstStoryPointInformation] = Object.values(
    markerToStoryPointInformation
  ).sort(
    (
      { scrollYPosition: firstScrollYPosition },
      { scrollYPosition: secondScrollYPosition }
    ) => {
      return firstScrollYPosition - secondScrollYPosition;
    }
  );

  return {
    lat: firstStoryPointInformation.lat,
    lng: firstStoryPointInformation.lng
  };
};
