import { useEffect, useRef, useState } from 'react';
import { Stack, styled } from '@mui/material';
import ItemAddBlock from './contents/ItemAddBlock';
import PictureBlock from './contents/PictureBlock';
import SelectionBlock from './contents/SelectionBlock';
import AvatarBlock from './contents/AvatarBlock';
import ImagePatternBlock from './contents/ImagePatternBlock';
import TextBlock from './contents/TextBlock';
import NextBtn from './NextBtn';

interface PlayStoryContentsProps {
  pages: interactivePagesData[];
  blockData: PagesBlock;
  currentBlockIndex: number;
  interactive: interactiveData;
  setCurrentPagesIndex: React.Dispatch<React.SetStateAction<number>>;
  setCurrentBlockIndex: React.Dispatch<React.SetStateAction<number>>;
  handleClickNextBtn: () => void;
}

const PlayStoryContents = ({
  pages,
  blockData,
  handleClickNextBtn,
  setCurrentPagesIndex,
  setCurrentBlockIndex
}: PlayStoryContentsProps) => {
  const wrapperRef = useRef<HTMLFormElement>(null);
  const wrapperRefHeight = wrapperRef.current?.clientHeight;
  const nextBtnHiddlenBlocks = ['Selection4BlockData', 'Selection2BlockData'];
  const fullScreenMapBlocks =
    [
      'ItemAddBlockData',
      'GPSBlockData',
      'ScoreBlockData',
      'ImagePatternBlockData',
      'FinishBlockData',
      'AvatarBlockData',
      'GotoBlockData',
      'InfoBlockData',
      'InfoCloseBlockData'
    ].indexOf(blockData.type) !== -1;
  const [checkBlockType, setCheckBlockType] = useState(fullScreenMapBlocks);

  const getBlockTypeToComponents = () => {
    switch (blockData.type) {
      case 'TextBlockData':
        return (
          <TextBlock wrapperRefHeight={wrapperRefHeight} block={blockData} />
        );
      case 'PictureBlockData':
        return (
          <PictureBlock wrapperRefHeight={wrapperRefHeight} block={blockData} />
        );
      case 'Selection4BlockData':
      case 'Selection2BlockData':
        return (
          <SelectionBlock
            handleSelectBlockData={handleSelectBlockData}
            block={blockData}
            pages={pages}
          />
        );
      case 'ItemAddBlockData':
        return <ItemAddBlock block={blockData} />;
      case 'AvatarBlockData':
        return <AvatarBlock block={blockData} />;
      case 'ImagePatternBlockData':
        return <ImagePatternBlock />;
      default:
        return <></>;
    }
  };

  const handleSelectBlockData = (selectionResult: string) => {
    pages.forEach((page, index) => {
      if (page.pageName === selectionResult) {
        setCurrentPagesIndex(index);
        setCurrentBlockIndex(0);
      }
    });
  };

  useEffect(() => {
    setCheckBlockType(fullScreenMapBlocks);
  }, [fullScreenMapBlocks]);

  return (
    <Wrapper ref={wrapperRef}>
      <BlockContents>{getBlockTypeToComponents()}</BlockContents>
      {nextBtnHiddlenBlocks.indexOf(blockData.type) === -1 && (
        <NextBtn
          blockData={blockData}
          checkBlockType={checkBlockType}
          handleClickNextBtn={handleClickNextBtn}
        />
      )}
    </Wrapper>
  );
};

export default PlayStoryContents;

const Wrapper = styled(Stack)(() => ({
  justifyContent: 'space-between',
  position: 'relative',
  width: '100%',

  '& .css-nen11g-MuiStack-root': {
    height: '10rem',
    maxHeight: '10rem'
  }
}));

const BlockContents = styled(Stack)(() => ({}));
