import './inputComponent.css'

import { useState } from 'react'

import { DebounceInput } from 'react-debounce-input';
import { Search, Lock } from '@material-ui/icons';

const inputIcons = {
  'Please, input your API key': Lock,
  'Keyword or phrase...': Search,
}

export const InputComponent = ({ type, minLength, debounceTimeout, placeholder, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false)

  const Icon = inputIcons[placeholder];

  return <div className={`input-component ${isFocused ? 'withFocus' : ''}`}>
    <Icon className='input-icon'/>
    <DebounceInput
      type={type}
      minLength={minLength}
      debounceTimeout={debounceTimeout}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className='debounce-input'
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)} />
  </div>
};
