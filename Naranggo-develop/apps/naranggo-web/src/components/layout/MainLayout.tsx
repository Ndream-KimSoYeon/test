import React from 'react';
import { Box, Stack, styled } from '@mui/material';
import MenuTabs from '../common/menu/MenuTabs';
import Footer from './Footer';
import Header from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
  isNotStrictPage?: true;
  pageName?: string;
}

const MainLayout = ({
  children,
  pageName,
  isNotStrictPage
}: MainLayoutProps) => {
  return (
    <MainLayoutStack>
      <Header pageName={pageName} />
      {isNotStrictPage ? (
        <MainContainer>{children}</MainContainer>
      ) : (
        <React.StrictMode>
          <MainContainer>{children}</MainContainer>
        </React.StrictMode>
      )}
      <Footer>
        <MenuTabs />
      </Footer>
    </MainLayoutStack>
  );
};

export default MainLayout;

const MainLayoutStack = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh'
}));

const MainContainer = styled(Box)(() => ({
  flex: 1,
  overflowY: 'auto'
}));
