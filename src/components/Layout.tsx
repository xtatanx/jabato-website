import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import 'normalize.css/normalize.css';
import '../common/scss/base.scss';

type HeaderProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: HeaderProps) => {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </>
  );
};

export default Layout;
