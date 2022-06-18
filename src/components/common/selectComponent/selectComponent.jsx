import './selectComponent.css';

import Select from 'react-select'

import { selectStyles } from './selectStyles';
import { selectTheme } from './selectTheme'

export const SelectComponent = ({ valueOptions, labelOptions = null, labelIconOptions = null, defaultValue, onChange, isSearchable }) => {
  const options = valueOptions.map((currentOption) => {
    const filterData = labelOptions ? labelOptions[currentOption] : currentOption

    return {
      'value': currentOption,
      'label': <span className='category-option-item'>{labelIconOptions && labelIconOptions[currentOption]} <span className='category-option-item-text'>{labelOptions ? labelOptions[currentOption] : currentOption}</span></span>,
      'filterData': filterData
    }
  })

  const customFilter = (option, searchText) => {
    if (
      option.data.filterData.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  };

  return <Select
    options={options}
    styles={selectStyles}
    defaultValue={{
      value: defaultValue,
      label: <span className='category-option-item'>{labelIconOptions && labelIconOptions[defaultValue]} <span className='category-option-item-text'>{labelOptions ? labelOptions[defaultValue] : defaultValue}</span></span>,
    }}
    isSearchable={isSearchable}
    filterOption={customFilter}
    theme={(theme) => selectTheme(theme)}
    className='select'
    onChange={onChange} />
};
