import './newsControls.css';

import { Help, BorderColor } from '@material-ui/icons';


import { Message } from '../message/Message';
import { Button } from '../button/Button'
import { SelectComponent } from '../selectComponent/selectComponent';
import { InputComponent } from '../inputComponent/InputComponent';

import { getNotSelectedItems } from './utils/getNotSelectedItems';
import { addSelectWithNotSelectedValue } from './utils/addSelectWithNotSelectedValue';
import { removeLastSelect } from './utils/removeLastSelect';
import { updateSelectedItems } from './utils/updateSelectedItems'
import { getAdditionalDataForNewsControls } from './utils/getAdditionalDataForNewsControls';
import { createErrorMessage } from './utils/createErrorMessage';
import { TabsComponent } from '../tabsComponent/TabsComponent';

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
  loading,
  countriesAvailableForFilterNews,
  minCountriesAvailableForFilterNews,
  maxCountriesAvailableForFilterNews,
  categoriesAvailableForFilterNews,
  minCategoriesAvailableForFilterNews,
  maxCategoriesAvailableForFilterNews,
  languagesAvailableForFilterNews,
  minLanguagesAvailableForFilterNews,
  maxLanguagesAvailableForFilterNews,
  isHighLightersBar,
  activeHighlighter,
  setActiveHighlighter }) => {

  const errorMessage = error && createErrorMessage(news, error)

  const {
    labelOptionForCountries,
    labelIconOptionsForCountries,
    labelIconOptionsForLanguages } = getAdditionalDataForNewsControls()

  const highlighters = [
    'green-highlighter',
    'yellow-highlighter',
    'orange-highlighter',
    'pink-highlighter',
    'purple-highlighter',
    'blue-highlighter'
  ]

  return (
    <section className='news-controls'>
      {error ?
        <Message type={errorMessage.type} title={errorMessage.title} >
          <p>{errorMessage.text}</p>
        </Message> : !loading &&
        <>
          {isHighLightersBar &&
            <>
              <div className="news-control-top-bar">
                <TabsComponent />
              </div>

              <BorderColor className='news-control-title-icon' />
              <h3 className='news-control-title'>Want to highlight something?</h3>
              <div className="news-control">
                <div className="news-control-highlight-bar">
                  {highlighters.map((highlighter, index) =>
                    <Button
                      key={index}
                      text={highlighter}
                      showText={false}
                      active={highlighter === activeHighlighter}
                      onClick={() => {
                        setActiveHighlighter(highlighter === activeHighlighter ? '' : highlighter)
                      }} />
                  )}
                </div>
              </div>
            </>}

          <Help className='news-control-title-icon' />
          <h3 className='news-control-title'>Want to find something special?</h3>

          <div className="news-control">
            <h4 className='select-title'>Selected country:</h4>
            {selectedCountries.map((country, index) => {
              const availableCountries = getNotSelectedItems(country, countriesAvailableForFilterNews, selectedCountries)

              return <SelectComponent
                key={index}
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
              {selectedCountries.length !== maxCountriesAvailableForFilterNews && selectedCountries[0] !== 'all' &&
                <Button text='Add More Countries'
                  onClick={() => {
                    if (!loading) {
                      addSelectWithNotSelectedValue(selectedCountries, countriesAvailableForFilterNews, setSelectedCountries)
                    }
                  }} />}
              {selectedCountries.length !== minCountriesAvailableForFilterNews &&
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
                key={index}
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
              {selectedCategories.length !== maxCategoriesAvailableForFilterNews && selectedCategories[0] !== 'all' &&
                <Button
                  text='Add More Categories'
                  onClick={() => {
                    if (!loading) {
                      addSelectWithNotSelectedValue(selectedCategories, Object.keys(categoriesAvailableForFilterNews), setSelectedCategories)
                    }
                  }} />}
              {selectedCategories.length !== minCategoriesAvailableForFilterNews &&
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
                key={index}
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
              {selectedLanguages.length !== maxLanguagesAvailableForFilterNews && selectedLanguages[0] !== 'all' &&
                <Button
                  text='Add More Languages'
                  onClick={() => {
                    if (!loading) {
                      addSelectWithNotSelectedValue(selectedLanguages, Object.keys(languagesAvailableForFilterNews), setSelectedLanguages)
                    }
                  }} />}
              {selectedLanguages.length !== minLanguagesAvailableForFilterNews &&
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
