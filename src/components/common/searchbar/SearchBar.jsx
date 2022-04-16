import './searchbar.css';

import { Search } from '@material-ui/icons';

export const SearchBar = ({placeholder}) => {
	return (
		<div className='search-bar'>
			<Search className='search-icon'/>
			<input type='text' className='search-input' placeholder={placeholder} />
		</div>
	);
};
