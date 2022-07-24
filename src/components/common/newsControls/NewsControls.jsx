import './newsControls.css';

import { Help } from '@material-ui/icons';
import uuid from 'react-uuid'

import { createErrorMessage } from './utils/createErrorMessage';

import { countriesAvailableForFilterNews } from './constants/countriesAvailableForFilterNews';
import { categoriesAvailableForFilterNews } from './constants/categoriesAvailableForFilterNews';
import { languagesAvailableForFilterNews } from './constants/languagesAvailableForFilterNews';

import { getNotSelectedItems } from './utils/getNotSelectedItems';
import { addSelectWithNotSelectedValue } from './utils/addSelectWithNotSelectedValue';
import { removeLastSelect } from './utils/removeLastSelect';
import { updateSelectedItems } from './utils/updateSelectedItems'
import { getAdditionalDataForNewsControls } from './utils/getAdditionalDataForNewsControls';

import { Message } from '../message/Message';
import { Button } from '../button/Button'
import { SelectComponent } from '../selectComponent/selectComponent';
import { InputComponent } from '../inputComponent/InputComponent';

export const NewsControls = ({
  news,
  error,
  selectedCountries,
  setSelectedCountries,
  selectedCategories,
  setSelectedCategories,
  selectedLanguages,
  setSelectedLanguages,
  keyword,
  setKeyword,
  loading }) => {

  const minParametersLength = 1
  const maxParametersLength = 5

  const errorMessage = error && createErrorMessage(news, error)

  const {
    labelOptionForCountries,
    labelIconOptionsForCountries,
    labelIconOptionsForLanguages } = getAdditionalDataForNewsControls()

  return (
    <section className='news-controls'>
      {error ?
        <Message type={errorMessage.type} title={errorMessage.title} >
          <p>{errorMessage.text}</p>
        </Message> : !loading &&
        <><Help className='news-control-title-icon' />
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
                    updateSelectedItems(index, value, selectedCountries, setSelectedCountries)
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
                      removeLastSelect(selectedCountries, setSelectedCountries)
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
                    updateSelectedItems(index, value, selectedCategories, setSelectedCategories)
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
                      removeLastSelect(selectedCategories, setSelectedCategories)
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
                    updateSelectedItems(index, value, selectedLanguages, setSelectedLanguages)
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
                      removeLastSelect(selectedLanguages, setSelectedLanguages)
                    }
                  }} />}
            </div>
          </div>
          <div className="news-control">
            <h4 className='select-title'>Keywords or phrases you are interested in:</h4>
            <InputComponent type="text"
              minLength={2}
              debounceTimeout={1000}
              placeholder={"Keyword..."}
              value={keyword}
              setValue={setKeyword}
            />
          </div>
        </>
      }
    </section>
  );
};
