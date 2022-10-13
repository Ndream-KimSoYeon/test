import { styled } from '@mui/material/styles';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { IconButton, Stack } from '@mui/material';

interface FloatingBtn {
  onClickFloatingBtn?: () => void;
  disabled?: boolean;
}

const FloatingBtn = ({ onClickFloatingBtn, disabled = false }: FloatingBtn) => (
  <Wrapper>
    <FloatingButton
      disabled={disabled}
      color="primary"
      onClick={onClickFloatingBtn}
    >
      <AddLocationAltIcon />
    </FloatingButton>
  </Wrapper>
);

export default FloatingBtn;

const Wrapper = styled(Stack)(() => ({
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  zIndex: 1,
  right: '3%',
  bottom: 20,
  background: 'rgba(4, 146, 194, 0.8);',
  borderRadius: '50%'
}));

const FloatingButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'disabled'
})(({ disabled }) => ({
  display: disabled ? 'none' : 'block',
  width: '3rem',
  height: '3rem',
  color: 'rgba(255, 255, 255, 1)'
}));
