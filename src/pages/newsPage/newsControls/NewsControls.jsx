import './newsControls.css';

import { Help } from '@material-ui/icons';
import uuid from 'react-uuid'

import { createErrorMessage } from '../businessLogic/createErrorMessage';

import { countriesAvailableForFilterNews } from '../constants/countriesAvailableForFilterNews';
import { categoriesAvailableForFilterNews } from '../constants/categoriesAvailableForFilterNews';
import { languagesAvailableForFilterNews } from '../constants/languagesAvailableForFilterNews';

import { getNotSelectedItems } from '../utils/getNotSelectedItems';
import { addSelectWithNotSelectedValue } from '../utils/addSelectWithNotSelectedValue';
import { removeLastSelect } from '../utils/removeLastSelect';
import { updateSelectedItems } from '../utils/updateSelectedItems'
import { getAdditionalDataForNewsControls } from '../utils/getAdditionalDataForNewsControls';

import { Message } from '../../../components/common/message/Message';
import { Button } from '../../../components/common/button/Button'
import { SelectComponent } from '../../../components/common/selectComponent/selectComponent';

export const NewsControls = ({
  news,
  error,
  selectedCountries,
  setSelectedCountries,
  selectedCategories,
  setSelectedCategories,
  selectedLanguages,
  setSelectedLanguages,
  loading }) => {

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
                if (!loading) {
                  updateSelectedItems(index, value, setSelectedCountries)
                }
              }}
              isSearchable={true} />
          }
          )}
          <div className="select-controls">
            {selectedCountries.length !== maxParametersLength && selectedCountries[0] !== 'all' &&
              <Button text='Add More Countries'
                onClick={() => {
                  if (!loading) {
                    addSelectWithNotSelectedValue(selectedCountries, countriesAvailableForFilterNews, setSelectedCountries)
                  }
                }} />}
            {selectedCountries.length !== minParametersLength &&
              <Button text='Remove Country'
                onClick={() => {
                  if (!loading) {
                    removeLastSelect( setSelectedCountries)
                  }
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
                if (!loading) {
                  updateSelectedItems(index, value, setSelectedCategories)
                }
              }}
              isSearchable={true} />
          })}
          <div className="select-controls">
            {selectedCategories.length !== maxParametersLength && selectedCategories[0] !== 'all' &&
              <Button
                text='Add More Categories'
                onClick={() => {
                  if (!loading) {
                    addSelectWithNotSelectedValue(selectedCategories, Object.keys(categoriesAvailableForFilterNews), setSelectedCategories)
                  }
                }} />}
            {selectedCategories.length !== minParametersLength &&
              <Button
                text='Remove Category'
                onClick={() => {
                  if (!loading) {
                    removeLastSelect( setSelectedCategories)
                  }
                }} />}
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
                if (!loading) {
                  updateSelectedItems(index, value, setSelectedLanguages)
                }
              }}
              isSearchable={true} />
          })}
          <div className="select-controls">
            {selectedLanguages.length !== maxParametersLength && selectedLanguages[0] !== 'all' &&
              <Button
                text='Add More Languages'
                onClick={() => {
                  if (!loading) {
                    addSelectWithNotSelectedValue(selectedLanguages, Object.keys(languagesAvailableForFilterNews), setSelectedLanguages)
                  }
                }} />}
            {selectedLanguages.length !== minParametersLength &&
              <Button
                text='Remove Language'
                onClick={() => {
                  if (!loading) {
                    removeLastSelect( setSelectedLanguages)
                  }
                }} />}
          </div>
        </div>

      </>)
      }
    </section>
  );
};
