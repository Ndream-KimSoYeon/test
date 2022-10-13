import SettingMenu from '@/components/menu/SettingMenu';
import MainLayout from '@/components/layout/MainLayout';
import withAuth from '@/components/common/withAuth';

const Menu: NextPageWithLayout = () => {
  return <SettingMenu />;
};

Menu.getLayout = (page: React.ReactElement) => (
  <MainLayout pageName={'메뉴'}>{page}</MainLayout>
);

export default withAuth(Menu);
