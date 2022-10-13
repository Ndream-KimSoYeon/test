import { Avatar, Stack, Typography, styled } from '@mui/material';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { getProfile } from '@/api';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
import FollowingBtn from './FollowingBtn';

const ProfileInfoArea = () => {
  const router = useRouter();

  const { data } = useQuery<Profile, AxiosError>('profile', () => getProfile());

  const { followCounts, nickname, profilepath, userinfo, isfollow } = (() => {
    if (!data) {
      return {
        followCounts: [],
        profilepath: '',
        userinfo: '',
        nickname: '',
        isfollow: 0
      };
    }

    const { storycount, followercount, followingcount } = data;

    return {
      ...data,
      followCounts: [
        { text: '스토리', data: storycount, path: '/mypage/story' },
        { text: '팔로워', data: followercount, path: '/profile/follower' },
        { text: '팔로잉', data: followingcount, path: '/profile/following' }
      ]
    };
  })();

  // 프로필 이미지 교체
  // todo: 사진첩으로 연결
  const handleClickEditProfileImg = () => {
    alert('이미지 교체');
  };

  return (
    <Wrapper>
      <ProfileAvatarWrapper>
        <ProfileAvatar>
          <AvatarImage
            alt={nickname}
            src={`https://resources-cf.naranggo.com/profiles/${profilepath}`}
          />
          {router.pathname === '/menu' ? (
            ''
          ) : (
            <ProfileAvatarEdit onClick={handleClickEditProfileImg}>
              <Edit />
            </ProfileAvatarEdit>
          )}
        </ProfileAvatar>
        {/* todo: 팔로우 리스트 페이지 구현되면 router 연결 */}
        <FollowCountWrapper>
          {followCounts.map(({ text, data, path }) => (
            <MemberInfoCountWrapper
              key={text}
              onClick={() => {
                router.push(path);
              }}
            >
              <Typography>{text}</Typography>
              <MemberInfoCountTypography>{data}</MemberInfoCountTypography>
            </MemberInfoCountWrapper>
          ))}
        </FollowCountWrapper>
      </ProfileAvatarWrapper>
      <ProfileTextWrapper>
        <Stack>
          <NickName>{nickname}</NickName>
          <Typography>{userinfo}</Typography>
        </Stack>
        {router.pathname === '/menu' ? (
          ''
        ) : (
          <FollowingBtn isfollow={isfollow} />
        )}
      </ProfileTextWrapper>
    </Wrapper>
  );
};

export default ProfileInfoArea;

const Wrapper = styled(Stack)(() => ({
  marginTop: '3.5rem',
  padding: '1rem'
}));

const ProfileAvatarWrapper = styled(Stack)(() => ({
  flexDirection: 'row',
  gap: '2rem',
  width: '100%'
}));

const ProfileAvatar = styled(Stack)(() => ({
  position: 'relative',
  justifyContent: 'space-around'
}));

const AvatarImage = styled(Avatar)(() => ({
  width: '5rem',
  height: '5rem'
}));

const ProfileAvatarEdit = styled(Stack)(() => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: '100%',
  height: '100%',
  borderRadius: '50%'
}));

const Edit = styled(EditIcon)(() => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: '2rem',
  height: '2rem',
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 1)',
  borderRadius: '50%',
  opacity: 0.5
}));

const ProfileTextWrapper = styled(Stack)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: '.625rem'
}));

const NickName = styled(Typography)(() => ({
  fontWeight: 'bold'
}));

const FollowCountWrapper = styled(Stack)(() => ({
  flex: '1',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: '1rem'
}));

const MemberInfoCountWrapper = styled(Stack)(() => ({
  justifyContent: 'center',
  textAlign: 'center'
}));

const MemberInfoCountTypography = styled(Typography)(() => ({
  fontSize: '1rem',
  fontWeight: 'bold'
}));
