import withAuth from '@/components/common/withAuth';
import ItemManagement from '@/components/item/ItemManagement';
import HeaderBack from '@/components/layout/HeaderBack';
import theme from '@/utils/theme';
import { Stack, styled, Button } from '@mui/material';
import { useRouter } from 'next/router';

interface ItemProps {
  itemList: Item[];
}

const Item: NextPageWithLayout = ({ itemList }: ItemProps) => {
  const router = useRouter();
  return (
    <Wrapper>
      <HeaderBack
        pageName="아이템 관리"
        rightButtons={
          <StyledButton
            onClick={() => {
              router.push('item/set');
            }}
          >
            추가
          </StyledButton>
        }
      />
      <ItemManagement itemList={itemList} />
    </Wrapper>
  );
};

export default withAuth(Item);

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

export const getServerSideProps = async () => {
  const res = await fetch(
    'https://gist.githubusercontent.com/Ndream-JeongHoYoung/2d8c291919e8b7be79124f8a51d657eb/raw/c019829c64f95fb226abdb8dc5c6ac0759248075/gistfile1.json'
  );

  const { ItemListData } = await res.json();

  return {
    props: { itemList: ItemListData }
  };
};
