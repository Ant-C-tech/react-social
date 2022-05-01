import './home.css';

import { TopBar } from '../../components/topbar/TopBar';
import { SideBar } from '../../components/sidebar/SideBar';

export const Home = () => {
	return (<>
		<TopBar />
		<main className="container-flex">
				<SideBar />
		</main>
	</>)
};
