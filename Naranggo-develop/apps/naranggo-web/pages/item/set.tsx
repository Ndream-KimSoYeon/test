import ItemSet from '@/components/item/ItemSet';
import HeaderBack from '@/components/layout/HeaderBack';
import theme from '@/utils/theme';
import { Button, Stack, styled } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import withAuth from '@/components/common/withAuth';
import useSnackBarStore from '@/store/useSnackBarStore';

const Set: NextPageWithLayout = () => {
  const router = useRouter();
  const { itemname, contents, imgpath } = router.query;
  const setIsSnackBarOpen = useSnackBarStore(
    (state) => state.setIsSnackBarOpen
  );
  const setSnackBarMessage = useSnackBarStore(
    (state) => state.setSnackBarMessage
  );

  const [itemInputs, setItemInputs] = useState({
    itemname: itemname || '',
    contents: contents || '',
    imgpath: imgpath || ''
  });

  const [selectedIconPath, setSelectedIconImagePath] = useState(imgpath || '');

  const onChangeItemInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setItemInputs({
      ...itemInputs,
      [name]: value
    });
  };

  const handleClickSaveBtn = () => {
    if (selectedIconPath === '' || undefined) {
      setIsSnackBarOpen(true);
      setSnackBarMessage('아이템 아이콘을 선택해주세요.');
    } else if (itemInputs.itemname === '' || undefined) {
      setIsSnackBarOpen(true);
      setSnackBarMessage('아이템 이름을 입력해주세요.');
    } else if (itemInputs.contents === '' || undefined) {
      setIsSnackBarOpen(true);
      setSnackBarMessage('아이템 설명을 입력해주세요.');
    }
  };

  return (
    <Wrapper>
      <HeaderBack
        pageName="아이템 제작"
        rightButtons={
          <StyledButton
            onClick={() => {
              handleClickSaveBtn();
            }}
          >
            저장
          </StyledButton>
        }
      />
      <ItemSet
        {...itemInputs}
        imgpath={selectedIconPath}
        onChangeItemInputValue={onChangeItemInputValue}
        setSelectedIconImagePath={setSelectedIconImagePath}
      />
    </Wrapper>
  );
};

export default withAuth(Set);

const Wrapper = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh'
}));

const StyledButton = styled(Button)(() => ({
  minWidth: 'initial',
  padding: '0',
  color: theme.palette.custom.light,
  fontWeight: 'bold',
  fontSize: '1rem'
}));
