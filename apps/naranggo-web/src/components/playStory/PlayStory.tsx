import PlayStoryContents from '@/components/playStory/PlayStoryContents';
import PlayStoryMap from '@/components/playStory/PlayStoryMap';
import { useState } from 'react';
import { styled, Snackbar } from '@mui/material';
import usePlayStoryAlert from '@/hooks/usePlayStoryAlert';
import styles from 'styles/Keyframes.module.css';
import helpers from '@/utils/helpers';
import { useRouter } from 'next/router';

interface PlayStoryProps {
  contents: PlayStoryContentsData;
}

const PlayStory = ({ contents }: PlayStoryProps) => {
  const { storyPoints, interactive } = contents;
  const { pages } = interactive;
  const router = useRouter();
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [currentPagesIndex, setCurrentPagesIndex] = useState(0);

  const blockData = pages[currentPagesIndex].blocks[currentBlockIndex];
  const { centerAlert, topAlert, snackBarOpen } = usePlayStoryAlert(blockData);
  const centerAlertType =
    blockData.type === 'GPSBlockData' || blockData.type === 'ScoreBlockData';
  const topAlertType =
    blockData.type === 'GPSBlockData' || blockData.type === 'InfoBlockData';

  if (blockData.type === 'GotoBlockData') {
    pages.forEach((page, index) => {
      if (page.pageName === blockData.gotoPage) {
        setCurrentPagesIndex(index);
        setCurrentBlockIndex(0);
      }
    });
  }

  if (!blockData) {
    return <></>;
  }

  const handleClickNextBtn = () => {
    blockData.type === 'FinishBlockData'
      ? router.back()
      : setCurrentBlockIndex(currentBlockIndex + 1);

    if (blockData.type === 'GPSBlockData') {
      pages.forEach((page, index) => {
        if (page.pageName === blockData.gotoPage) {
          setCurrentPagesIndex(index);
          setCurrentBlockIndex(0);
        }
      });
    }

    // "패턴 인식 실패" 시 이동하는 block으로 설정
    // todo: 인식 성공 로직 구현
    if (blockData.type === 'ImagePatternBlockData') {
      pages.forEach((page, index) => {
        if (blockData.patternCancel === page.pageName) {
          setCurrentBlockIndex(index);
          setCurrentBlockIndex(0);
        }
      });
    }
  };

  return (
    <>
      <PlayStoryMap storyPoints={storyPoints} blockData={blockData} />
      <PlayStoryContents
        interactive={interactive}
        pages={pages}
        blockData={blockData}
        currentBlockIndex={currentBlockIndex}
        setCurrentBlockIndex={setCurrentBlockIndex}
        setCurrentPagesIndex={setCurrentPagesIndex}
        handleClickNextBtn={handleClickNextBtn}
      />
      {centerAlert && centerAlertType && (
        <Alert open={snackBarOpen} message={centerAlert} />
      )}
      {topAlert && topAlertType && (
        <Alert open={snackBarOpen} message={topAlert} infoBlock={true} />
      )}
    </>
  );
};

export default PlayStory;

const Alert = styled(
  Snackbar,
  helpers.shouldNotForwardProp('infoBlock')
)<{ infoBlock?: boolean }>(({ infoBlock, theme }) => ({
  top: infoBlock ? '10%' : '30%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: infoBlock ? 'max-content' : '60%',
  height: 'max-content',
  textAlign: 'center',
  wordBreak: 'break-word',
  whiteSpace: 'pre-line',
  opacity: 0.9,
  zIndex: 9998,
  animation: infoBlock
    ? ''
    : `${styles.snackbar_bounce} 0.5s ease-in-out alternate`,

  '& > div': {
    justifyContent: 'center',
    color: theme.palette.custom.dark,
    backgroundColor: theme.palette.custom.grey200
  }
}));
