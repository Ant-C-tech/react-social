import './inputComponent.css'

import { useState } from 'react'

import { DebounceInput } from 'react-debounce-input';
import { Search, Lock, Backspace } from '@material-ui/icons';

const inputIcons = {
  'Please, input your API key': Lock,
  'Keyword...': Search,
}

export const InputComponent = ({ type, minLength, debounceTimeout, placeholder, value, setValue }) => {
  const [isFocused, setIsFocused] = useState(false)

  const Icon = inputIcons[placeholder];

  return <div className={`input-component ${isFocused ? 'withFocus' : ''}`}>
    <Icon className='input-icon' />
    <DebounceInput
      type={type}
      minLength={minLength}
      debounceTimeout={debounceTimeout}
      placeholder={placeholder}
      value={value}
      onChange={(event) => { setValue(event.target.value) }}
      className='debounce-input'
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
    {value.length > 0 && <button className='input-component-clear-button' onClick={() => { setValue('') }}>
      <Backspace className='input-component-clear-button-icon' />
    </button>}
  </div>

};
