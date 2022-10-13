import TwoOptionsModal from '@/components/common/Modal/TwoOptionsModal';
import withAuth from '@/components/common/withAuth';
import PlayStory from '@/components/playStory/PlayStory';
import HeaderBack from '@/components/layout/HeaderBack';
import { Stack, styled, Typography } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface PlayStoryPageProps {
  contents: PlayStoryContentsData;
  title: string;
}

const PlayStoryPage: NextPageWithLayout = ({
  contents,
  title
}: PlayStoryPageProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(!isModalOpen);

  const handlePlayStoryClose = () => {
    router.back();
  };

  return contents ? (
    <Wrapper>
      <HeaderBack pageName={title} onClickBack={handleOpenModal} />
      <PlayStory contents={contents} />
      <TwoOptionsModal
        leftBtnName="취소"
        rightBtnName="확인"
        isModalOpen={isModalOpen}
        onCloseModal={handleOpenModal}
        onClickLeftBtn={handleOpenModal}
        onClickRightBtn={handlePlayStoryClose}
        widthPx="85%"
      >
        <TwoOptionsModalText>
          진행 중인 스토리를 종료하시겠습니까?
        </TwoOptionsModalText>
      </TwoOptionsModal>
    </Wrapper>
  ) : (
    <></>
  );
};

export const getStaticPaths = async () => {
  // 임시로 paths값 적용
  const paths = [];

  for (let i = 26301; i < 26313; i++) {
    paths.push({ params: { playStoryId: i.toString() } });
  }

  return {
    fallback: true,
    paths: paths
  };
};

export const getStaticProps = async () => {
  const res = await fetch(
    'https://gist.githubusercontent.com/Ndream-JeongHoYoung/a5a2c8e61cba513f04d9edca5894bf58/raw/9075ec45a1ad8569f60207d4adcc92107ddfc306/gistfile2.txt'
  );

  const { contents, title } = await res.json();

  return {
    props: { contents, title }
  };
};

export default withAuth(PlayStoryPage);

const Wrapper = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh',
  '& h6': {
    width: '65%',
    fontSize: '.9rem'
  }
}));

const TwoOptionsModalText = styled(Typography)(() => ({
  padding: '10% 0',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  textAlign: 'center'
}));
