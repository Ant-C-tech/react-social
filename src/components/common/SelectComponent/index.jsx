import './styles.css';
import { newsIcon } from '@assets';

import { useState, useEffect } from 'react';

import Select from 'react-select';

import { selectStyles } from './selectStyles';
import { selectTheme } from './selectTheme';

export const SelectComponent = ({
  valueOptions,
  labelOptions = null,
  labelIconOptions = null,
  defaultValue,
  onChange,
  isSearchable,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const AllIcon = () => (
    <img
      src={newsIcon}
      alt='#'
      style={{
        width: '45px',
        paddingRight: '10px',
        objectFit: 'contain',
      }}
      aria-hidden={true}
    />
  );

  const getIcon = (item) => {
    return item === 'all' ? (
      <AllIcon />
    ) : labelIconOptions ? (
      labelIconOptions[item]
    ) : null;
  };

  const options = valueOptions.map((currentOption) => {
    return {
      value: currentOption,
      label: (
        <span className='select-option-item'>
          <span>{getIcon(currentOption)}{' '}</span>
          <span className='select-option-item-text'>
            {labelOptions && currentOption !== 'all'
              ? labelOptions[currentOption]
              : currentOption}
          </span>
        </span>
      ),
      filterData:
        labelOptions && currentOption !== 'all'
          ? labelOptions[currentOption]
          : currentOption,
    };
  });

  const customFilter = (option, searchText) => {
    if (
      option.data.filterData.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  };

  const getValue = (value) => {
    return {
      value: value,
      label: (
        <span className='select-value'>
          {getIcon(value)}{' '}
          <span className='select-value-text'>
            {labelOptions && value !== 'all' ? labelOptions[value] : value}
          </span>
        </span>
      ),
    };
  };

  return (
    <Select
      options={options}
      styles={selectStyles}
      value={getValue(value)}
      isSearchable={isSearchable}
      hideSelectedOptions={true}
      filterOption={customFilter}
      theme={(theme) => selectTheme(theme)}
      className={`select ${isFocused ? 'select-with-focus' : ''}`}
      onChange={onChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};
