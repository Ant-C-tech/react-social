import './page.css';

import { TopBar } from '../components/topbar/TopBar';
import { NavBar } from '../components/navbar/NavBar';
import { NewsPage } from './newsPage/NewsPage';

export const Page = () => {
  return (<>
    <TopBar />
    <main className="container-flex">
      <NavBar />
      <NewsPage/>
    </main>
  </>)
};
