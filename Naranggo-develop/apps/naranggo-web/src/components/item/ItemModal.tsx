import {
  Box,
  Stack,
  styled,
  Button,
  Modal,
  Typography,
  ButtonGroup
} from '@mui/material';
import theme from '@/utils/theme';

interface ItemModalProps {
  isModalOpen: boolean;
  idproducerinventory?: number;
  itemname?: string;
  onClose: (idproducerinventory?: number) => void;
}

const ItemModal = ({
  isModalOpen,
  onClose,
  idproducerinventory,
  itemname
}: ItemModalProps) => {
  const removeBlock = () => {
    onClose(idproducerinventory);
  };

  const handleOnClose = () => {
    onClose();
  };

  return (
    <Modal open={isModalOpen} onClose={handleOnClose}>
      <ModalWrapper>
        <StyledItemName>
          {itemname}
          <StyledTypography>을(를) 삭제하시겠습니까?</StyledTypography>
        </StyledItemName>
        <AlignWrapper>
          <ModalBtnGroup variant="contained">
            <ModalBtn onClick={removeBlock}>아이템 삭제</ModalBtn>
            <ModalBtn onClick={handleOnClose}>취소</ModalBtn>
          </ModalBtnGroup>
        </AlignWrapper>
      </ModalWrapper>
    </Modal>
  );
};

export default ItemModal;

const ModalWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '18rem',
  height: '13rem',
  padding: '1rem',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '.25rem',
  border: 'none'
}));

const ModalBtnGroup = styled(ButtonGroup)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  boxShadow: 'none',
  border: 'none'
}));

const ModalBtn = styled(Button)(() => ({
  width: '45%',
  color: theme.palette.custom.light,
  backgroundColor: theme.palette.custom.blue,
  borderRadius: '.25rem !important'
}));

const AlignWrapper = styled(Stack)(() => ({
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignSelf: 'center',
  width: '100%',
  marginTop: '0.5rem'
}));

const StyledItemName = styled(Stack)(() => ({
  display: 'inline-block',
  fontWeight: 'bold'
}));

const StyledTypography = styled(Typography)(() => ({
  display: 'inline'
}));
