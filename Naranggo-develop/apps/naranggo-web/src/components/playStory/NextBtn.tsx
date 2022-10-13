import { Button, styled } from '@mui/material';
import theme from '@/utils/theme';

interface NextBtnProps {
  handleClickNextBtn: () => void;
  checkBlockType: boolean;
  blockData: PagesBlock;
}

const NextBtn = ({
  handleClickNextBtn,
  checkBlockType,
  blockData
}: NextBtnProps) => {
  return (
    <>
      <StyledNextBtn
        isActive={checkBlockType}
        variant="contained"
        onClick={handleClickNextBtn}
      >
        {blockData.type !== 'FinishBlockData' ? '다음' : '종료'}
      </StyledNextBtn>
    </>
  );
};

export default NextBtn;

const StyledNextBtn = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isActive'
})<{ isActive: boolean }>(({ isActive }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  width: '7rem',
  margin: '0 auto 2rem',
  padding: '0.4rem .625rem',
  backgroundColor: theme.palette.custom.blue,
  color: theme.palette.custom.light,
  borderRadius: '1rem',
  position: isActive ? 'absolute' : 'initial',
  bottom: isActive ? '0' : 'initial',
  left: isActive ? '50%' : 'initial',
  transform: isActive ? 'translateX(-50%)' : 'initial',

  '&:hover': {
    backgroundColor: theme.palette.custom.blue
  }
}));
