import { ReactElement } from 'react';
import { Box, ButtonGroup, Modal, styled } from '@mui/material';

interface ButtonListModalProps {
  open: boolean;
  onClose: () => void;
  buttons: ReactElement[];
}

const ButtonListModal = ({ open, onClose, buttons }: ButtonListModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Wrapper>
        <StyledBtnGroup
          orientation="vertical"
          aria-label="vertical contained button groups"
          variant="text"
        >
          {buttons}
        </StyledBtnGroup>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '300px',
  backgroundColor: 'white',
  borderRadius: 4
}));

const StyledBtnGroup = styled(ButtonGroup)(() => ({
  width: '100%',
  border: 'none',
  '& .MuiButtonGroup-grouped:not(:last-of-type)': {
    border: 'none'
  }
}));

export default ButtonListModal;
