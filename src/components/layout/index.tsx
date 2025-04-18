import { type PropsWithChildren } from 'react';

import Footer from './footer';
import Header from './header';

const Layout = ({ children }: PropsWithChildren) => (
  <div className='bg-white p-4 sm:p-10 dark:bg-slate-950'>
    <div className='mx-auto flex h-[calc(100vh-32px)] min-h-[calc(100vh-32px)] max-w-[2560px] min-w-80 flex-col overflow-x-hidden rounded-lg border border-slate-400 bg-gray-100 sm:h-[calc(100vh-80px)] sm:min-h-[calc(100vh-80px)] dark:border-slate-700 dark:bg-slate-900'>
      <Header />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  </div>
);

export default Layout;
