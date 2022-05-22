import './searchbar.css';

import { DebounceInput } from 'react-debounce-input';
import { Search } from '@material-ui/icons';

export const SearchBar = ({ placeholder = 'Happy hacking...', value='', }) => {
	return (
		<div className='search-bar'>
			<Search className='search-icon' />
			<DebounceInput
				className='search-input'
				type="text"
				minLength={2}
				debounceTimeout={500}
				placeholder={placeholder} value={value}
				// onChange={e => onChange(e.target.value)}
			/>
			{/* <input type='text' className='search-input' placeholder={placeholder} />s */}
		</div>
	);
};
