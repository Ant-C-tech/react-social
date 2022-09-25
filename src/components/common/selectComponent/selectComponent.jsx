import './selectComponent.css';

import { useState } from 'react';

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

  return (
    <Select
      options={options}
      styles={selectStyles}
      defaultValue={{
        value: defaultValue,
        label: (
          <span className='option-item'>
            {getIcon(defaultValue)}{' '}
            <span className='option-item-text'>
              {labelOptions && defaultValue !== 'all'
                ? labelOptions[defaultValue]
                : defaultValue}
            </span>
          </span>
        ),
      }}
      isSearchable={isSearchable}
      filterOption={customFilter}
      theme={(theme) => selectTheme(theme)}
      className={`select ${isFocused ? 'withFocus' : ''}`}
      onChange={onChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};
