import { Avatar, Stack, Typography, styled } from '@mui/material';
import { getStoryImage } from '@/utils/image';
import RoundCheckBtn from '@/components/common/btn/RoundCheckBtn';

interface FollowListProps {
  followList: FollowItem[];
}

const FollowList = ({ followList }: FollowListProps) => (
  <Wrapper>
    {followList.map(({ iduser, nickname, profilepath, isfollow }) => (
      <FollowListWrapper key={iduser}>
        <FollowAvatorWrapper>
          <FollowAvator
            alt={nickname}
            src={getStoryImage('profile', profilepath)}
          />
          <FollowNicknameTypography>{nickname}</FollowNicknameTypography>
        </FollowAvatorWrapper>
        <RoundCheckBtn
          onClickBtn={() =>
            isfollow === 1 ? alert('팔로우 취소') : alert('팔로우')
          }
          text={isfollow ? '팔로잉' : '팔로우'}
          isCheck={isfollow}
        />
      </FollowListWrapper>
    ))}
  </Wrapper>
);
export default FollowList;

const Wrapper = styled(Stack)(() => ({
  overflowY: 'auto'
}));

const FollowListWrapper = styled(Stack)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '.625rem',
  alignItems: 'center'
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
