import useSnackBarStore from '@/store/useSnackBarStore';
import { Snackbar, styled } from '@mui/material';

const SnackBarAlert = () => {
  const { isSnackBarOpen, message, vertical } = useSnackBarStore();

  return (
    <StyledSnackBar
      open={isSnackBarOpen}
      autoHideDuration={2000}
      message={message}
      onClose={() => {
        useSnackBarStore.setState({ isSnackBarOpen: false });
      }}
      anchorOrigin={{ vertical, horizontal: 'center' }}
    />
  );
};
export default SnackBarAlert;

const StyledSnackBar = styled(Snackbar)(() => ({
  '&.MuiSnackbar-anchorOriginTopCenter': {
    top: '30%'
  },

  '&.MuiSnackbar-anchorOriginBottomCenter': {
    bottom: '90px'
  },
  zIndex: 9999
}));
