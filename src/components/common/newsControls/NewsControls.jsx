import './newsControls.css';

import greenHighlighterIcon from '../../../assets/highlighter-svgrepo-com-green.svg'
import blueHighlighterIcon from '../../../assets/highlighter-svgrepo-com-blue.svg'
import orangeHighlighterIcon from '../../../assets/highlighter-svgrepo-com-orange.svg'
import pinkHighlighterIcon from '../../../assets/highlighter-svgrepo-com-pink.svg'
import purpleHighlighterIcon from '../../../assets/highlighter-svgrepo-com-purple.svg'
import yellowHighlighterIcon from '../../../assets/highlighter-svgrepo-com-yellow.svg'
import eraser from '../../../assets/eraser-svgrepo-com.svg'

import { useState } from 'react'

import { HelpTwoTone, AddCircleTwoTone, RemoveCircleTwoTone, DeleteForeverTwoTone, BorderColorTwoTone } from '@material-ui/icons';

import { Message } from '../message/Message';
import { Button } from '../button/Button'
import { SelectComponent } from '../selectComponent/selectComponent';
import { InputComponent } from '../inputComponent/InputComponent';
import { TabPanel } from '../tabs/TabPanel';

import { getNotSelectedItems } from './utils/getNotSelectedItems';
import { addSelectWithNotSelectedValue } from './utils/addSelectWithNotSelectedValue';
import { removeLastSelect } from './utils/removeLastSelect';
import { updateSelectedItems } from './utils/updateSelectedItems'
import { getAdditionalDataForNewsControls } from './utils/getAdditionalDataForNewsControls';
import { createErrorMessage } from './utils/createErrorMessage';
import { StyledTab } from '../tabs/StyledTab';
import { StyledTabs } from '../tabs/StyledTabs';

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
  activeTool,
  setActiveTool }) => {

  const errorMessage = error && createErrorMessage(news, error)

  const [tab, setTab] = useState(0);

  const {
    labelOptionForCountries,
    labelIconOptionsForCountries,
    labelIconOptionsForLanguages } = getAdditionalDataForNewsControls()

  const highlighters = [
    { name: 'green-highlighter', icon: greenHighlighterIcon },
    { name: 'yellow-highlighter', icon: yellowHighlighterIcon },
    { name: 'orange-highlighter', icon: orangeHighlighterIcon },
    { name: 'pink-highlighter', icon: pinkHighlighterIcon },
    { name: 'purple-highlighter', icon: purpleHighlighterIcon },
    { name: 'blue-highlighter', icon: blueHighlighterIcon }
  ]

  const handleChangeTab = (_event, newTab) => {
    setTab(newTab);
    setActiveTool('');
  };

  const a11yProps = (index) => {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  }

  return (
    <section className='news-controls'>
      {error ?
        <Message type={errorMessage.type} title={errorMessage.title} >
          <p>{errorMessage.text}</p>
        </Message> : !loading &&
        <>
          {isHighLightersBar &&
            <>
              <StyledTabs value={tab} onChange={handleChangeTab} aria-label="tabs">
                <StyledTab label="Find news" {...a11yProps(0)} />
                <StyledTab label="Edit news" {...a11yProps(1)} />
              </StyledTabs>
            </>
          }

          <TabPanel value={tab} index={0}>
            <HelpTwoTone fontSize="large" className='news-control-title-icon' />
            <h3 className='news-control-title'>Do You want to find something special?</h3>

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
                    }}
                    buttonComponentIcon={AddCircleTwoTone} />}
                {selectedCountries.length !== minCountriesAvailableForFilterNews &&
                  <Button text='Remove Country'
                    onClick={() => {
                      if (!loading) {
                        removeLastSelect(selectedCountries, setSelectedCountries)
                      }
                    }}
                    buttonComponentIcon={RemoveCircleTwoTone} />}
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
                    }}
                    buttonComponentIcon={AddCircleTwoTone} />}
                {selectedCategories.length !== minCategoriesAvailableForFilterNews &&
                  <Button
                    text='Remove Category'
                    onClick={() => {
                      if (!loading) {
                        removeLastSelect(selectedCategories, setSelectedCategories)
                      }
                    }}
                    buttonComponentIcon={RemoveCircleTwoTone} />}
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
                    }}
                    buttonComponentIcon={AddCircleTwoTone} />}
                {selectedLanguages.length !== minLanguagesAvailableForFilterNews &&
                  <Button
                    text='Remove Language'
                    onClick={() => {
                      if (!loading) {
                        removeLastSelect(selectedLanguages, setSelectedLanguages)
                      }
                    }}
                    buttonComponentIcon={RemoveCircleTwoTone} />}
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
          </TabPanel>

          <TabPanel value={tab} index={1}>
            <BorderColorTwoTone fontSize="large" className='news-control-title-icon' />
            <h3 className='news-control-title'>Do You want to highlight something?</h3>
            <div className="news-control">
              <div className="news-control-toolbar">
                {highlighters.map((highlighter, index) => {
                  const { name, icon } = highlighter
                  return (<Button
                    key={index}
                    active={name === activeTool}
                    onClick={() => {
                      setActiveTool(name === activeTool ? '' : name)
                    }}
                    buttonImageIcon={icon} />)
                }
                )}
              </div>
            </div>

            <DeleteForeverTwoTone fontSize="large" className='news-control-title-icon' />
            <h3 className='news-control-title'>Do You want to delete some highlight?</h3>
            <div className="news-control">
              <div className="news-control-toolbar">
                <Button
                  active={'eraser' === activeTool}
                  onClick={() => {
                    setActiveTool('eraser' === activeTool ? '' : 'eraser')
                  }}
                  buttonImageIcon={eraser} />
              </div>
            </div>
          </TabPanel>
        </>
      }
    </section>
  );
};
