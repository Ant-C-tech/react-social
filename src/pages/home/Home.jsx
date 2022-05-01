import './home.css';

import { TopBar } from '../../components/topbar/TopBar';
import { SideBar } from '../../components/sidebar/SideBar';
import { Feed } from '../../components/feed/Feed';
import { RightBar } from '../../components/rightbar/RightBar';

export const Home = () => {
	return (<>
		<TopBar />
		<main className="container-flex">
			<SideBar />
			<Feed />
			<RightBar />
		</main>
	</>)
};
