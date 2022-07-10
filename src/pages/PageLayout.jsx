import './pageLayout.css';

import { TopBar } from '../components/sections/topbar/TopBar';
import { NavBar } from '../components/sections/navbar/NavBar';

export const PageLayout = ({ children}) => {
  return (<>
    <TopBar />
    <main className="container-flex">
      <NavBar />
      {children}
    </main>
  </>)
};
