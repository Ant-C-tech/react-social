import { DebounceInput } from 'react-debounce-input';

export const InputComponent = ({ type, minLength, debounceTimeout, placeholder, value, onChange}) => {
  return <DebounceInput
    type={type}
    minLength={minLength}
    debounceTimeout={debounceTimeout}
    placeholder={placeholder}
    value={value}
    onChange={onChange} />
};
