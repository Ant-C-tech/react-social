import './input.css';

import { DebounceInput } from 'react-debounce-input';

export const Input = ({ Legend, value, placeholder, onChange }) => {
	return (
		<section className="info message">
			<Legend />
			<DebounceInput
				type="text"
				minLength={2}
				debounceTimeout={500}
				placeholder={placeholder} value={value}
				onChange={e => onChange(e.target.value)} />
		</section>
	)
};
