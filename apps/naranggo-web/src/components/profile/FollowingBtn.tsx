import { Stack, styled } from '@mui/material';
import RoundCheckBtn from '@/components/common/btn/RoundCheckBtn';

interface FollowItem {
  isfollow: number;
}

const FollowingBtn = ({ isfollow }: FollowItem) => (
  <Wrapper direction="row">
    {/* todo: 본인 아이디 일 경우, 팔로잉(팔로우) 버튼은 미노출 처리 */}
    <RoundCheckBtn text={isfollow ? '팔로잉' : '팔로우'} isCheck={isfollow} />
    {/* todo: 차단 여부 isfollow에서 isblock으로 변경 */}
    <RoundCheckBtn text="차단" isCheck={isfollow} />
  </Wrapper>
);

export default FollowingBtn;

const Wrapper = styled(Stack)(() => ({
  alignItems: 'center',
  gap: '0.5rem'
}));
