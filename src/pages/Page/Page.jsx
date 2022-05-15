import './page.css';

import { TopBar } from './topbar/TopBar';
import { SideBar } from './sidebar/SideBar';
import { RightBar } from './rightbar/RightBar';

export const Page = ({ content }) => {
	return (<>
		<TopBar />
		<main className="container-flex">
			<SideBar />
			<section className='content-container'>
				{content}
			</section>
			<RightBar />
		</main>
	</>)
};
