import HeaderBack from '@/components/layout/HeaderBack';
import { Stack, styled } from '@mui/material';
import AlertList from '@/components/common/alarm/AlertList';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';
import withAuth from '@/components/common/withAuth';

interface AlarmProps {
  alertList: AlertItem[];
}

const Block: NextPageWithLayout = ({ alertList }: AlarmProps) => {
  const [alertItems, setAlertItems] = useState(alertList);

  const handleRemoveAllItems = () => {
    setAlertItems([]);
  };

  return (
    <Wrapper>
      <HeaderBack
        pageName="새 소식"
        rightButtons={
          <DeleteForeverIcon onClick={() => handleRemoveAllItems()} />
        }
      />
      {alertItems.length > 0 ? (
        <AlertList alertItems={alertItems} setAlertItems={setAlertItems} />
      ) : (
        <NoAlertList>새로운 알림이 없습니다.</NoAlertList>
      )}
    </Wrapper>
  );
};

export default withAuth(Block);

const Wrapper = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh'
}));

const NoAlertList = styled(Stack)(() => ({
  marginTop: '50%',
  overflow: 'hidden',
  textAlign: 'center',
  fontWeight: 'bold'
}));

export const getServerSideProps = async () => {
  const res = await fetch(
    'https://gist.githubusercontent.com/Ndream-JeongHoYoung/2d8c291919e8b7be79124f8a51d657eb/raw/8f28d93104da183022ab1d000af74b6943753d49/gistfile1.json'
  );

  const { AlertListData } = await res.json();

  return {
    props: { alertList: AlertListData }
  };
};
