import './selectComponent.css';

import { useState, useEffect } from 'react';

import Select from 'react-select';
import { AllInclusiveTwoTone } from '@material-ui/icons';

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

  const getIcon = (item) => {
    return item === 'all' ? (
      <AllInclusiveTwoTone />
    ) : labelIconOptions ? (
      labelIconOptions[item]
    ) : null;
  };

  const options = valueOptions.map((currentOption) => {
    return {
      value: currentOption,
      label: (
        <span className='category-option-item'>
          {getIcon(currentOption)}{' '}
          <span className='category-option-item-text'>
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
        <span className='option-item'>
          {getIcon(value)}{' '}
          <span className='option-item-text'>
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
      className={`select ${isFocused ? 'withFocus' : ''}`}
      onChange={onChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};
