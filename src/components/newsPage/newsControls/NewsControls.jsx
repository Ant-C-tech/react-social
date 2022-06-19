import './newsControls.css';

import { Help } from '@material-ui/icons';
import uuid from 'react-uuid'

import { createErrorMessage } from '../businessLogic/createErrorMessage';

import { countriesAvailableForFilterNews } from '../constants/countriesAvailableForFilterNews';
import { categoriesAvailableForFilterNews } from '../constants/categoriesAvailableForFilterNews';
import { languagesAvailableForFilterNews } from '../constants/languagesAvailableForFilterNews';

import { getNotSelectedItems } from './utils/getNotSelectedItems';
import { addSelectWithRandomNotSelectedValue } from './utils/addSelectWithRandomNotSelectedValue';
import { removeLastSelect } from './utils/removeLastSelect';
import { updateSelectedItems } from './utils/updateSelectedItems'
import { getAdditionalDataForNewsControls } from './utils/getAdditionalDataForNewsControls';

import { Message } from '../../common/message/Message';
import { Button } from '../../common/button/Button'
import { SelectComponent } from '../../common/selectComponent/selectComponent';

export const NewsControls = ({ news, error, selectedCountries, setSelectedCountries, selectedCategories, setSelectedCategories, selectedLanguages, setSelectedLanguages }) => {
  const minParametersLength = 1
  const maxParametersLength = 5

  const errorMessage = error && createErrorMessage(news, error)

  const { labelOptionForCountries, labelIconOptionsForCountries, labelIconOptionsForLanguages } = getAdditionalDataForNewsControls()

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

            return <SelectComponent
              key={uuid()}
              valueOptions={availableCountries}
              labelOptions={labelOptionForCountries}
              labelIconOptions={labelIconOptionsForCountries}
              defaultValue={country}
              onChange={({ value }) => {
                updateSelectedItems(index, value, selectedCountries, setSelectedCountries)
              }}
              isSearchable={true} />
          }
          )}
          <div className="select-controls">
            {selectedCountries.length !== maxParametersLength && selectedCountries[0] !== 'all' &&
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
            const availableCategories = getNotSelectedItems(category, Object.keys(categoriesAvailableForFilterNews), selectedCategories)
            return <SelectComponent
              key={uuid()}
              valueOptions={availableCategories}
              labelIconOptions={categoriesAvailableForFilterNews}
              defaultValue={category}
              onChange={({ value }) => {
                updateSelectedItems(index, value, selectedCategories, setSelectedCategories)
              }}
              isSearchable={true} />
          })}
          <div className="select-controls">
            {selectedCategories.length !== maxParametersLength && selectedCategories[0] !== 'all' &&
              <Button
                text='Add More Categories'
                onClick={() => addSelectWithRandomNotSelectedValue(selectedCategories, categoriesAvailableForFilterNews, setSelectedCategories)} />}
            {selectedCategories.length !== minParametersLength &&
              <Button
                text='Remove Category'
                onClick={() => removeLastSelect(selectedCategories, setSelectedCategories)} />}
          </div>
        </div>

        <div className="news-control">
          <h4 className='select-title'>Selected languages:</h4>
          {selectedLanguages.map((language, index) => {
            const availableLanguages = getNotSelectedItems(language, Object.keys(languagesAvailableForFilterNews), selectedLanguages)

            return <SelectComponent
              key={uuid()}
              valueOptions={availableLanguages}
              labelOptions={languagesAvailableForFilterNews}
              labelIconOptions={labelIconOptionsForLanguages}
              defaultValue={language}
              onChange={({ value }) => {
                updateSelectedItems(index, value, selectedLanguages, setSelectedLanguages)
              }}
              isSearchable={true} />
          })}
          <div className="select-controls">
            {selectedLanguages.length !== maxParametersLength && selectedLanguages[0] !== 'all' &&
              <Button
                text='Add More Languages'
                onClick={() => addSelectWithRandomNotSelectedValue(selectedLanguages, Object.keys(languagesAvailableForFilterNews), setSelectedLanguages)} />}
            {selectedLanguages.length !== minParametersLength &&
              <Button
                text='Remove Language'
                onClick={() => removeLastSelect(selectedLanguages, setSelectedLanguages)} />}
          </div>
        </div>

      </>)
      }
    </section>
  );
};
