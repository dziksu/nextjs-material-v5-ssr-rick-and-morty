import type { NextPage } from 'next';
import { Header } from '../modules/layout';
import { SystemPage } from '../modules/mui-system';

const System: NextPage = () => {
  return (
    <div>
      <Header />
      <SystemPage />
    </div>
  );
};

export default System;
