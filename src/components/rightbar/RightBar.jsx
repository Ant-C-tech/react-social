import './rightbar.css';

import { NewsControl } from '../newsPage/newsControl/NewsControl';

export const RightBar = ({ message }) => {
	return <aside className='rightbar'>
		<NewsControl message={message} />
	</aside>;
};
