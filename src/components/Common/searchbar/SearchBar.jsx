import './searchbar.css';

import { Search } from '@material-ui/icons';

export const SearchBar = ({placeholder}) => {
	return (
		<div className='search-bar'>
			<Search />
			<input type='text' className='search-input' placeholder={placeholder} />
		</div>
	);
};
