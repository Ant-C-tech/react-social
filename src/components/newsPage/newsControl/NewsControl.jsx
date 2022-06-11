import './newsControl.css';

import { Help } from '@material-ui/icons';
import ReactFlagsSelect from "react-flags-select";
import { countries } from 'country-data';

import { createErrorMessage } from '../../../businessLogic/news/createErrorMessage';
import { newsAvailableCountries } from '../../../constants/newsAvailableCountries';

import { Message } from '../../common/message/Message';
import { Button } from '../../common/button/Button'

export const NewsControl = ({ news, error, selectedCountries, setSelectedCountries }) => {
  const minCountriesQuantity = 1
  const maxCountriesQuantity = 5

  var rn = require('random-number');
  var gen = rn.generator({
    min: 0
    , max: newsAvailableCountries.length
    , integer: true
  })

  const getCountriesAvailableForSelecting = (currentCountry) => {
    const countriesAvailableForSelecting = newsAvailableCountries.filter(newsAvailableCountry => selectedCountries.indexOf(newsAvailableCountry) === -1);
    countriesAvailableForSelecting.push(currentCountry)
    return countriesAvailableForSelecting
  }

  const addCountry = () => {
    const indexesOfSelectedCountries = selectedCountries.map(country => newsAvailableCountries.indexOf(country))
    let indexOfRandomCountry
    do {
      indexOfRandomCountry = gen()
    }
    while (indexesOfSelectedCountries.indexOf(indexOfRandomCountry) !== -1);
    setSelectedCountries(selectedCountries => [...selectedCountries, newsAvailableCountries[indexOfRandomCountry]])
  }

  const changeCountry = (index, code) => {
    const updatedSelectedCountries = [...selectedCountries]
    updatedSelectedCountries[index] = code
    setSelectedCountries([...updatedSelectedCountries])
  }

  const removeCountry = () => {
    setSelectedCountries(selectedCountries => selectedCountries.splice(0, selectedCountries.length - 1))
  }

  const errorMessage = error && createErrorMessage(news, error)
  console.log("Render");

  return (
    <section className='news-control'>
      {error && <Message type={errorMessage.type} title={errorMessage.title} text={errorMessage.text} />}
      {news.length > 0 && (<><Help className='news-control-title-icon' />
        <h3 className='news-control-title'>What are you interesting in?</h3>

        <h4 className='country-select-title'>Selected country:</h4>
        {selectedCountries.map((country, index) => (
          <ReactFlagsSelect
            key={index}
            className='country-select'
            countries={getCountriesAvailableForSelecting(country)}
            selected={country}
            onSelect={(code) => changeCountry(index, code)}
            placeholder={countries[country].name}
            searchPlaceholder='Search country...'
            searchable
          />
        ))}
        <div className="country-controls">
          {selectedCountries.length !== maxCountriesQuantity && <Button text='Add More Countries' onClick={addCountry} />}
          {selectedCountries.length !== minCountriesQuantity && <Button text='Remove Country' onClick={removeCountry} />}
        </div>
      </>)
      }
    </section>
  );
};
