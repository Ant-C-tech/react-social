import './home.css';

import { TopBar } from '../../components/topbar/TopBar';
import { SideBar } from '../../components/sidebar/SideBar';
import { Feed } from '../../components/feed/Feed';

export const Home = () => {
	return (<>
		<TopBar />
		<main className="container-flex">
			<SideBar />
			<Feed />
		</main>
	</>)
};
