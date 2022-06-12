import './newsControls.css';

import { Help } from '@material-ui/icons';
import ReactFlagsSelect from "react-flags-select";
import { countries } from 'country-data';
import Select from 'react-select'
import uuid from 'react-uuid'

import { createErrorMessage } from '../businessLogic/createErrorMessage';

import { countriesAvailableForFilterNews } from '../constants/countriesAvailableForFilterNews';
import { iconsForCategories } from '../constants/iconsForCategories';
import { categoriesAvailableForFilterNews } from '../constants/categoriesAvailableForFilterNews';

import { getItemsAvailableForSelecting } from './utils/getItemsAvailableForSelecting';
import { addSelectWithRandomItem } from './utils/addSelectWithRandomItem';
import { removeLastSelect } from './utils/removeLastSelect';
import { updateSelectedItems } from './utils/updateSelectedItems'

import { Message } from '../../common/message/Message';
import { Button } from '../../common/button/Button'

export const NewsControls = ({ news, error, selectedCountries, setSelectedCountries, selectedCategories, setSelectedCategories }) => {
  const minParametersLength = 1
  const maxParametersLength = 5

  const selectTheme = (theme) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary: '#707070',
        primary25: 'rgb(230, 250, 230)'
      }
    }
  }

  const selectStyles = {
    control: (styles) => ({
      ...styles,
      position: 'relative',
      left: '0px',
      marginBottom: '15px',
      color: '#3f3f3f',
      border: '1px solid',
      borderColor: '#707070',
      boxShadow: '12px 15px 10px -5px #707070',
      transition: 'box-shadow ease-in-out 0.2s, left ease-in-out 0.2s',
      "&:hover": {
        boxShadow: '0px 0px 0px 0px #707070',
        left: '3px'
      },
    }),
    menu: (styles) => ({
      ...styles,
      position: 'relative',
      left: '0px',
      color: '#3f3f3f',
      boxShadow: "12px 15px 10px -5px #707070",
      transition: 'box-shadow ease-in-out 0.2s, left ease-in-out 0.2s',
      "&:hover": {
        boxShadow: '0px 0px 0px 0px #707070',
        left: '3px'
      }
    }),
    menuList: (styles) => ({
      ...styles,
      margin: '0 10px'
    }),
    option: (styles) => ({
      ...styles,
      borderRadius: '4px'
    }),
  }

  const errorMessage = error && createErrorMessage(news, error)

  // In developing purpose
  console.log("Render");

  return (
    <section className='news-controls'>
      {error && <Message type={errorMessage.type} title={errorMessage.title} >
        <p>{errorMessage.text}</p>
      </Message>}
      {(<><Help className='news-control-title-icon' />
        <h3 className='news-control-title'>What are you interesting in?</h3>

        <div className="news-control">
          <h4 className='select-title'>Selected country:</h4>
          {selectedCountries.map((country, index) => (
            <ReactFlagsSelect
              key={uuid()}
              className='country-select'
              countries={getItemsAvailableForSelecting(country, countriesAvailableForFilterNews, selectedCountries)}
              selected={country}
              onSelect={(code) => {
                updateSelectedItems(index, code, selectedCountries, setSelectedCountries)
              }}
              placeholder={countries[country].name}
              searchPlaceholder='Search country...'
              searchable
            />
          ))}
          <div className="select-controls">
            {selectedCountries.length !== maxParametersLength &&
              <Button text='Add More Countries'
                onClick={() => addSelectWithRandomItem(selectedCountries, countriesAvailableForFilterNews, setSelectedCountries)} />}
            {selectedCountries.length !== minParametersLength &&
              <Button text='Remove Country'
                onClick={() => {
                  removeLastSelect(selectedCountries, setSelectedCountries)
                }} />}
          </div>
        </div>

        <div className="news-control">
          <h4 className='select-title'>Selected category:</h4>
          {selectedCategories.map((category, index) => {
            const availableCategories = getItemsAvailableForSelecting(category, categoriesAvailableForFilterNews, selectedCategories)
            const options = availableCategories.map((availableCategory) => {
              return {
                'value': availableCategory,
                'label': <span className='category-option-item'>{iconsForCategories[availableCategory]} <span className='category-option-item-text'>{availableCategory}</span></span>
              }
            })
            return <Select key={uuid()}
              options={options}
              styles={selectStyles}
              defaultValue={{
                value: category,
                label: <span className='category-option-item'>{iconsForCategories[category]} <span className='category-option-item-text'>{category}</span></span>
              }}
              isSearchable
              theme={selectTheme}
              className='category-select'
              onChange={({ value }) => {
                updateSelectedItems(index, value, selectedCategories, setSelectedCategories)
              }
              } />
          })}
          <div className="select-controls">
            {selectedCategories.length !== maxParametersLength &&
              <Button
                text='Add More Categories'
                onClick={() => addSelectWithRandomItem(selectedCategories, categoriesAvailableForFilterNews, setSelectedCategories)} />}
            {selectedCategories.length !== minParametersLength &&
              <Button
                text='Remove Categories'
                onClick={() => removeLastSelect(selectedCategories, setSelectedCategories)} />}
          </div>
        </div>

      </>)
      }
    </section>
  );
};
