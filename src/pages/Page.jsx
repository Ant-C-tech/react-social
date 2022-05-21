import './page.css';

import { TopBar } from '../components/topbar/TopBar';
import { SideBar } from '../components/sidebar/SideBar';
import { NewsPage } from '../components/newsPage/NewsPage';

export const Page = () => {
  return (<>
    <TopBar />
    <main className="container-flex">
      <SideBar />
      <NewsPage/>
    </main>
  </>)
};
