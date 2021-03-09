import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Main = (props: any) => {
  return (
    <div className="main">
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Main;
