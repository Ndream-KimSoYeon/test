import { RefObject } from 'react';
import { styled } from '@mui/material/styles';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import RoomIcon from '@mui/icons-material/Room';
import PATH from '@/consts/paths';
import Divider from '@/components/common/Divider';
import { useState } from 'react';
import helpers from '@/utils/helpers';

interface StoryContentProps {
  storyContentRef: RefObject<HTMLDivElement>;
  storyPointsWithBlockKey: StoryPointWithBlockKey[];
}

const StoryContent = ({
  storyContentRef,
  storyPointsWithBlockKey
}: StoryContentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const renderStoryContentDependOnBlockType = (block: Block) => {
    switch (block.type) {
      case 'TextBlockData':
        return <TextContent>{block.text}</TextContent>;
      case 'PictureBlockData':
        return (
          <ImageContent
            src={PATH.STORY_CONTENT_IMAGE + block.src}
            onClick={() => {
              setIsModalOpen(true);
              setModalImage(block.src);
            }}
          />
        );
      default:
        return helpers.assertNever(block);
    }
  };

  return (
    <Wrapper ref={storyContentRef}>
      {storyPointsWithBlockKey.map(
        ({
          PointName,
          koAddress,
          enAddress,
          blocks,
          Latitude,
          Longitude
        }: StoryPointWithBlockKey) => {
          return (
            <StoryPointWrapper key={`${Latitude}-${Longitude}`}>
              <StoryPointHeaderWrapper>
                <MarkerIconWrapper>
                  <MarkerIcon />
                </MarkerIconWrapper>
                <LocationWrapper>
                  <LocationName>{PointName}</LocationName>
                  <DetailAddress>{koAddress || enAddress}</DetailAddress>
                </LocationWrapper>
              </StoryPointHeaderWrapper>
              <Divider height="0.08rem" />
              <ContentWrapper>
                {blocks.map((block: BlockWithKey) => (
                  <Content key={block.blockId}>
                    {renderStoryContentDependOnBlockType(block)}
                  </Content>
                ))}
              </ContentWrapper>
              <Divider height="0.3rem" />
            </StoryPointWrapper>
          );
        }
      )}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <>
          <CloseBtn onClick={() => setIsModalOpen(false)}>
            <CloseModalIcon />
          </CloseBtn>
          <ModalImage src={PATH.STORY_CONTENT_IMAGE + modalImage} />
        </>
      </Modal>
    </Wrapper>
  );
};

export default StoryContent;

const Wrapper = styled(Box)(() => ({}));

const StoryPointWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderColor: theme.palette.custom.grey2,
  border: '30px',
  overflow: 'hidden'
}));

const MarkerIconWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  fontSize: '26px'
}));

const MarkerIcon = styled(RoomIcon)(({ theme }) => ({
  color: theme.palette.custom.blue,
  fontSize: '2.4rem'
}));

const StoryPointHeaderWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  padding: '15px 5px'
}));

const LocationWrapper = styled(Box)(() => ({
  flex: 6
}));

const LocationName = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: '16px'
}));

const DetailAddress = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.custom.grey
}));

const ContentWrapper = styled(Box)(() => ({
  padding: '15px 10px'
}));

const Content = styled(Box)(() => ({}));

const TextContent = styled('div')(() => ({
  whiteSpace: 'pre-wrap',
  fontSize: '0.8rem'
}));

const ImageContent = styled('img')(() => ({
  width: '100%',
  margin: '0.2rem 0'
}));

const ModalImage = styled('img')(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain'
}));

const CloseBtn = styled(IconButton)(() => ({
  position: 'absolute',
  top: 0,
  left: 0
}));

const CloseModalIcon = styled(CancelRoundedIcon)(() => ({
  color: 'white',
  fontSize: '2rem'
}));
