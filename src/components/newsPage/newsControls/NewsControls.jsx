import './newsControls.css';

import { Help } from '@material-ui/icons';
import { countries } from 'country-data';
import uuid from 'react-uuid'

import { createErrorMessage } from '../businessLogic/createErrorMessage';

import { countriesAvailableForFilterNews } from '../constants/countriesAvailableForFilterNews';
import { iconsForCategories } from '../constants/iconsForCategories';
import { categoriesAvailableForFilterNews } from '../constants/categoriesAvailableForFilterNews';

import { getNotSelectedItems } from './utils/getNotSelectedItems';
import { addSelectWithRandomNotSelectedValue } from './utils/addSelectWithRandomNotSelectedValue';
import { removeLastSelect } from './utils/removeLastSelect';
import { updateSelectedItems } from './utils/updateSelectedItems'

import { Message } from '../../common/message/Message';
import { Button } from '../../common/button/Button'
import { SelectComponent } from '../../common/selectComponent/selectComponent';

export const NewsControls = ({ news, error, selectedCountries, setSelectedCountries, selectedCategories, setSelectedCategories }) => {
  const minParametersLength = 1
  const maxParametersLength = 5

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
          {selectedCountries.map((country, index) => {
            const availableCountries = getNotSelectedItems(country, countriesAvailableForFilterNews, selectedCountries)

            const labelOptions = {}
            const labelIconOptions = {}

            countries.all.forEach((country) => {
              labelOptions[country.alpha2.toLowerCase()] = country.name
              labelIconOptions[country.alpha2.toLowerCase()] = <span>{country.emoji}</span>
            })

            return <SelectComponent
              key={uuid()}
              valueOptions={availableCountries}
              labelOptions={labelOptions}
              labelIconOptions={labelIconOptions}
              defaultValue={country}
              onChange={({ value }) => {
                updateSelectedItems(index, value, selectedCountries, setSelectedCountries)
              }}
              isSearchable={true} />
          }
          )}
          <div className="select-controls">
            {selectedCountries.length !== maxParametersLength &&
              <Button text='Add More Countries'
                onClick={() => addSelectWithRandomNotSelectedValue(selectedCountries, countriesAvailableForFilterNews, setSelectedCountries)} />}
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
            const availableCategories = getNotSelectedItems(category, categoriesAvailableForFilterNews, selectedCategories)
            return <SelectComponent
              key={uuid()}
              valueOptions={availableCategories}
              labelIconOptions={iconsForCategories}
              defaultValue={category}
              onChange={({ value }) => {
                updateSelectedItems(index, value, selectedCategories, setSelectedCategories)
              }}
              isSearchable={true} />
          })}
          <div className="select-controls">
            {selectedCategories.length !== maxParametersLength &&
              <Button
                text='Add More Categories'
                onClick={() => addSelectWithRandomNotSelectedValue(selectedCategories, categoriesAvailableForFilterNews, setSelectedCategories)} />}
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
