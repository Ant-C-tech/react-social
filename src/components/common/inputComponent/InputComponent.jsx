import './inputComponent.css';

import { useState } from 'react';

import { DebounceInput } from 'react-debounce-input';
import { BackspaceTwoTone } from '@material-ui/icons';

export const InputComponent = ({
  type,
  minLength,
  debounceTimeout,
  placeholder,
  value,
  setValue,
  icon,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const Icon = icon;

  return (
    <div className={`input-component ${isFocused ? 'withFocus' : ''}`}>
      <Icon className='input-icon' />
      <DebounceInput
        type={type}
        minLength={minLength}
        debounceTimeout={debounceTimeout}
        placeholder={placeholder}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        className='debounce-input'
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {value.length > 0 && (
        <button
          className='input-component-clear-button'
          onClick={() => {
            setValue('');
          }}
        >
          <BackspaceTwoTone className='input-component-clear-button-icon' />
        </button>
      )}
    </div>
  );
};
