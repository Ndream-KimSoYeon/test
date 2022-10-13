import { Avatar, Stack, Typography, styled } from '@mui/material';
import theme from '@/utils/theme';
import { useState } from 'react';
import BlockModal from './BlockModal';

interface FollowListProps {
  followList: FollowItem[];
}

const BlockList = ({ followList }: FollowListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blockList, setBlockList] = useState(followList);
  const [selectedFollowitem, setSelectedFollowitem] = useState<FollowItem>();

  // 모달창 open
  const handleFollowList = (followItem: FollowItem) => {
    setIsModalOpen(true);
    setSelectedFollowitem(followItem);
  };

  // 모달창 close, 차단해제
  const callRemoveBlock = (iduser: number) => {
    setBlockList(blockList.filter((item) => item.iduser !== iduser));
  };

  return (
    <>
      <FollowWrapper>
        {blockList.map((followItem: FollowItem) => {
          const { iduser, nickname, profilepath } = followItem;

          return (
            <FollowListWrapper key={iduser}>
              <FollowAvatorWrapper>
                <FollowAvator
                  alt={nickname}
                  src={`https://resources-cf.naranggo.com/profiles/${profilepath}`}
                />
                <FollowNicknameTypography>{nickname}</FollowNicknameTypography>
              </FollowAvatorWrapper>
              <FollowBtn onClick={() => handleFollowList(followItem)}>
                <Typography>차단해제</Typography>
              </FollowBtn>
            </FollowListWrapper>
          );
        })}
      </FollowWrapper>
      <BlockModal
        isModalOpen={isModalOpen}
        onClose={(iduser) => {
          setIsModalOpen(false);
          if (iduser) {
            callRemoveBlock(iduser);
          }
        }}
        nickname={selectedFollowitem?.nickname}
        iduser={selectedFollowitem?.iduser}
      />
    </>
  );
};
export default BlockList;

const FollowWrapper = styled(Stack)(() => ({
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
}));

const FollowListWrapper = styled(Stack)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '.625rem'
}));

const FollowAvatorWrapper = styled(Stack)(() => ({
  flexDirection: 'row'
}));

const FollowAvator = styled(Avatar)(() => ({
  width: '3rem',
  height: '3rem'
}));

const FollowNicknameTypography = styled(Typography)(() => ({
  marginLeft: '1rem',
  lineHeight: '3rem',
  fontWeight: 'bold'
}));

const FollowBtn = styled(Stack)(() => ({
  flexDirection: 'row',
  margin: 'auto 0',
  padding: '0.25rem .625rem',
  backgroundColor: theme.palette.custom.blue,
  color: theme.palette.custom.light,
  borderRadius: '1rem'
}));
