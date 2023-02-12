import './styles.css';
import { exitIcon } from '@assets';

import { useState } from 'react';

import { DebounceInput } from 'react-debounce-input';
// import { BackspaceTwoTone } from '@material-ui/icons';

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

  return (
    <div className={`input-component ${isFocused ? 'withFocus' : ''}`}>
      <img className='input-icon' src={icon} alt='#' aria-hidden={true} />
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
          {/* <BackspaceTwoTone className='input-component-clear-button-icon' /> */}
          <img
            src={exitIcon}
            className='input-component-clear-button-icon'
            alt='#'
            aria-hidden={true}
          />
        </button>
      )}
    </div>
  );
};
