import React, { useState } from 'react';
import List from '@mui/material/List';
import HeaderBack from '@/components/layout/HeaderBack';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderItem from '@/components/avatar/FolderItem';
import { Button, IconButton, styled } from '@mui/material';
import AvatarFolderCreateModal from '@/components/avatar/AvatarFolderCreateModal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRouter } from 'next/router';
import withAuth from '@/components/common/withAuth';
import { PAGES_URL } from '@/consts/constants';

interface AvatarMangeProps {
  avatarList: Avatar[];
  avatarFolderList: AvatarFolder[];
}

const AvatarManage: NextPageWithLayout = ({
  avatarList,
  avatarFolderList
}: AvatarMangeProps) => {
  const [isAvatarFolderCreateModal, setIsAvatarFolderCreateModal] =
    useState(false);
  const handleClickAvatarFolderCreateBtn = () =>
    setIsAvatarFolderCreateModal(true);
  const handleCloseAvatarFolderCreateModal = () =>
    setIsAvatarFolderCreateModal(false);
  const router = useRouter();

  return (
    <>
      <HeaderBack
        pageName="아바타 관리"
        rightButtons={
          <AddAvatarBtn onClick={handleClickAvatarFolderCreateBtn}>
            <AddAvatar />
          </AddAvatarBtn>
        }
      />
      <AvatarFolderList aria-labelledby="nested-list-subheader">
        {avatarFolderList.map(({ idavatarfolder, foldername }) => (
          <FolderItem
            key={idavatarfolder}
            idavatarfolder={idavatarfolder}
            foldername={foldername}
            avatarList={avatarList}
            avatarFolderList={avatarFolderList}
          />
        ))}
      </AvatarFolderList>
      <AvatarFolderCreateModal
        isModalOpen={isAvatarFolderCreateModal}
        leftBtnName="취소하기"
        rightBtnName="생성하기"
        onCloseModal={handleCloseAvatarFolderCreateModal}
        onClickLeftBtn={handleCloseAvatarFolderCreateModal}
        onClickRightBtn={() => {
          // todo : 아바타 폴더 생성 구현
        }}
      />
      <CreateAvatarBtn
        onClick={() => {
          router.push('/' + PAGES_URL.AVATAR_CREATE);
        }}
      >
        <StyledAddCircleOutlineIcon />
      </CreateAvatarBtn>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(
    'https://gist.githubusercontent.com/Ndream-KimYoungHoo/e8d840e394a3a173fdc66bcfaad864b3/raw/237e2796d1d0891b72188ea61abcf40342a49b35/gistfile1.json'
  );

  const { avatarList, avatarFolderList } = await res.json();

  return {
    props: {
      avatarList,
      avatarFolderList
    }
  };
};

export default withAuth(AvatarManage);

const AddAvatarBtn = styled(Button)(({ theme }) => ({
  minWidth: 'initial',
  padding: '0',
  color: theme.palette.custom.light,
  fontWeight: 'bold',
  fontSize: '1rem'
}));

const AddAvatar = styled(CreateNewFolderIcon)(() => ({}));

const AvatarFolderList = styled(List)(() => ({
  width: '100%',
  bgcolor: 'background.paper',
  padding: 0
}));

const CreateAvatarBtn = styled(IconButton)(() => ({
  position: 'fixed',
  right: '5rem',
  bottom: '1rem'
}));

const StyledAddCircleOutlineIcon = styled(AddCircleOutlineIcon)(
  ({ theme }) => ({
    fontSize: '3rem',
    color: theme.palette.custom.blue
  })
);
