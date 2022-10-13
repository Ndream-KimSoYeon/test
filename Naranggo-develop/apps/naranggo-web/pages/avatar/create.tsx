import React, { useState } from 'react';
import HeaderBack from '@/components/layout/HeaderBack';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import AvatarSaveModal from '@/components/avatar/AvatarSaveModal';

interface AvatarCreateProps {
  avatarFolderList: AvatarFolder[];
}

const AvatarCreate: NextPageWithLayout = ({
  avatarFolderList
}: AvatarCreateProps) => {
  const [isAvatarSaveModalShown, setIsAvatarSaveModalShown] = useState(false);
  const handleClickSaveBtn = () => setIsAvatarSaveModalShown(true);
  const handleCloseAvatarSaveModal = () => setIsAvatarSaveModalShown(false);

  return (
    <>
      <HeaderBack
        pageName="아바타 생성"
        rightButtons={<SaveBtn onClick={handleClickSaveBtn}>저장</SaveBtn>}
      />
      <AvatarSaveModal
        isModalOpen={isAvatarSaveModalShown}
        leftBtnName="취소하기"
        rightBtnName="저장하기"
        avatarFolderList={avatarFolderList}
        onCloseModal={handleCloseAvatarSaveModal}
        onClickLeftBtn={handleCloseAvatarSaveModal}
        onClickRightBtn={() => {
          // todo : 저장하기 기능 구현
        }}
      />
    </>
  );
};

export default AvatarCreate;

export const getStaticProps = async () => {
  const res = await fetch(
    'https://gist.githubusercontent.com/Ndream-KimYoungHoo/e8d840e394a3a173fdc66bcfaad864b3/raw/237e2796d1d0891b72188ea61abcf40342a49b35/gistfile1.json'
  );

  const { avatarFolderList } = await res.json();

  return {
    props: {
      avatarFolderList
    }
  };
};

const SaveBtn = styled(Button)(() => ({
  color: 'white'
}));
