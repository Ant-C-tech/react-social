import './newsControls.css';

import { Help } from '@material-ui/icons';
import ReactFlagsSelect from "react-flags-select";
import { countries } from 'country-data';
import { Component } from 'react'
import Select from 'react-select'
import uuid from 'react-uuid'

import { createErrorMessage } from '../businessLogic/createErrorMessage';
import { countriesAvailableForFilterNews } from '../constants/countriesAvailableForFilterNews';
import { getItemsAvailableForSelecting } from '../utils/getItemsAvailableForSelecting';
import { addSelectWithRandomItem } from '../utils/addSelectWithRandomItem'

import { Message } from '../../common/message/Message';
import { Button } from '../../common/button/Button'
import { categoriesAvailableForFilterNews } from '../constants/categoriesAvailableForFilterNews';

export const NewsControls = ({ news, error, selectedCountries, setSelectedCountries, selectedCategories, setSelectedCategories }) => {
  const minParametersLength = 1
  const maxParametersLength = 5

  var rn = require('random-number');
  var gen = rn.generator({
    min: 0
    , max: countriesAvailableForFilterNews.length
    , integer: true
  })

  // const addCountry = () => {
  //   const indexesOfSelectedCountries = selectedCountries.map(country => countriesAvailableForFilterNews.indexOf(country))
  //   let indexOfRandomCountry
  //   do {
  //     indexOfRandomCountry = gen()
  //   }
  //   while (indexesOfSelectedCountries.indexOf(indexOfRandomCountry) !== -1);
  //   setSelectedCountries(selectedCountries => [...selectedCountries, countriesAvailableForFilterNews[indexOfRandomCountry]])
  // }

  const changeCountry = (index, code) => {
    const updatedSelectedCountries = [...selectedCountries]
    updatedSelectedCountries[index] = code
    setSelectedCountries([...updatedSelectedCountries])
  }

  const removeCountry = () => {
    setSelectedCountries(selectedCountries => selectedCountries.splice(0, selectedCountries.length - 1))
  }

  const errorMessage = error && createErrorMessage(news, error)
  // In developing purpose
  console.log("Render");

  return (
    <section className='news-controls'>
      {error && <Message type={errorMessage.type} title={errorMessage.title} text={errorMessage.text} />}
      {news.length > 0 && (<><Help className='news-control-title-icon' />
        <h3 className='news-control-title'>What are you interesting in?</h3>

        <div className="news-control">
          <h4 className='select-title'>Selected country:</h4>
          {selectedCountries.map((country, index) => (
            <ReactFlagsSelect
              key={uuid()}
              className='country-select'
              countries={getItemsAvailableForSelecting(country, countriesAvailableForFilterNews, selectedCountries)}
              selected={country}
              onSelect={(code) => changeCountry(index, code)}
              placeholder={countries[country].name}
              searchPlaceholder='Search country...'
              searchable
            />
          ))}
          <div className="select-controls">
            {selectedCountries.length !== maxParametersLength && <Button text='Add More Countries' onClick={() => addSelectWithRandomItem(selectedCountries, countriesAvailableForFilterNews, setSelectedCountries)} />}
            {selectedCountries.length !== minParametersLength && <Button text='Remove Country' onClick={removeCountry} />}
          </div>
        </div>

        <div className="news-control">
          <h4 className='select-title'>Selected category:</h4>
          {selectedCategories.map((category, index) => {
            const availableCategories = getItemsAvailableForSelecting(category, categoriesAvailableForFilterNews, selectedCategories)
            const options = availableCategories.map((category) => {
              return {
                'value': category,
                'label': category[0].toUpperCase() + category.substring(1)
              }
            })
            return <Select key={uuid()} options={options} />
          })}
          <div className="select-controls">
            {selectedCategories.length !== maxParametersLength && <Button text='Add More Categories' onClick={() => addSelectWithRandomItem(selectedCategories, categoriesAvailableForFilterNews, setSelectedCategories)} />}
            {selectedCategories.length !== minParametersLength && <Button text='Remove Categories' onClick={removeCountry} />}
          </div>
        </div>

      </>)
      }
    </section>
  );
};
