import GoogleLogin from '@/components/login/GoogleLogin';
import NaverLogin from '@/components/login/NaverLogin';
import KakaoLogin from '@/components/login/KakaoLogin';
import Button from '@mui/material/Button';

const Login: NextPageWithLayout = () => {
  return (
    <>
      <div>로그인 페이지 테스트입니다.</div>
      <Button
        onClick={() => {
          fetch('/api/login', { credentials: 'include' }).then(() => {
            history.back();
          });
        }}
      >
        api로 로그인하기
      </Button>
      <GoogleLogin />
      <NaverLogin/>
      <KakaoLogin/>
    </>
  );
};

export default Login;
