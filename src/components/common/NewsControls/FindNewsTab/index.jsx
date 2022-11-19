import './styles.css';

import magnifyingGlass from '@assets/magnifying-glass.png';
import hintIcon from '@assets/idea.png';
import countriesIcon from '@assets/globe.png';
import categoriesIcon from '@assets/compass.png';
import languagesIcon from '@assets/languages.png';
import keywordsIcon from '@assets/keyword.png';

import {
  WORLD_COUNTRY_NAMES,
  WORLD_COUNTRY_FLAGS,
  WORLD_COUNTRY_FLAGS_BY_LANGUAGE_CODE,
} from '@constants';

import { InputComponent } from '@common/InputComponent/';
import { FilterItem } from './FilterItem';

export const FindNewsTab = ({ findNewsTabProps }) => {
  const {
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
  } = findNewsTabProps;

  const filterItemsConfig = [
    {
      title: 'Selected country:',
      icon: countriesIcon,
      selectedItems: selectedCountries,
      setSelectedItems: setSelectedCountries,
      itemsAvailableForFilterNews: countriesAvailableForFilterNews,
      minItemsAvailableForFilterNews: minCountriesAvailableForFilterNews,
      maxItemsAvailableForFilterNews: maxCountriesAvailableForFilterNews,
      labelOptionForItems: WORLD_COUNTRY_NAMES,
      labelIconOptionsForItems: WORLD_COUNTRY_FLAGS,
      addButtonText: 'Add More Countries',
      removeButtonText: 'Remove Country',
    },
    {
      title: 'Selected category:',
      icon: categoriesIcon,
      selectedItems: selectedCategories,
      setSelectedItems: setSelectedCategories,
      itemsAvailableForFilterNews: Object.keys(
        categoriesAvailableForFilterNews,
      ),
      minItemsAvailableForFilterNews: minCategoriesAvailableForFilterNews,
      maxItemsAvailableForFilterNews: maxCategoriesAvailableForFilterNews,
      labelOptionForItems: null,
      labelIconOptionsForItems: categoriesAvailableForFilterNews,
      addButtonText: 'Add More Categories',
      removeButtonText: 'Remove Category',
    },
    {
      title: 'Selected languages:',
      icon: languagesIcon,
      selectedItems: selectedLanguages,
      setSelectedItems: setSelectedLanguages,
      itemsAvailableForFilterNews: Object.keys(languagesAvailableForFilterNews),
      minItemsAvailableForFilterNews: minLanguagesAvailableForFilterNews,
      maxItemsAvailableForFilterNews: maxLanguagesAvailableForFilterNews,
      labelOptionForItems: languagesAvailableForFilterNews,
      labelIconOptionsForItems: WORLD_COUNTRY_FLAGS_BY_LANGUAGE_CODE,
      addButtonText: 'Add More Languages',
      removeButtonText: 'Remove Language',
    },
  ];

  return (
    <>
      <img
        className='find-news-tab-title-icon'
        src={hintIcon}
        alt='#'
        aria-hidden={true}
      />
      <h3 className='find-news-tab-title'>
        Do You want to find something special?
      </h3>

      {filterItemsConfig.map((filterItem, index) => (
        <FilterItem
          key={index}
          title={filterItem.title}
          icon={filterItem.icon}
          selectedItems={filterItem.selectedItems}
          setSelectedItems={filterItem.setSelectedItems}
          itemsAvailableForFilterNews={filterItem.itemsAvailableForFilterNews}
          minItemsAvailableForFilterNews={
            filterItem.minItemsAvailableForFilterNews
          }
          maxItemsAvailableForFilterNews={
            filterItem.maxItemsAvailableForFilterNews
          }
          labelOptionForItems={filterItem.labelOptionForItems}
          labelIconOptionsForItems={filterItem.labelIconOptionsForItems}
          addButtonText={filterItem.addButtonText}
          removeButtonText={filterItem.removeButtonText}
          loading={loading}
        />
      ))}

      <>
        <div className='find-news-tab-keyword-input-title-wrapper'>
          <img
            className='find-news-tab-keyword-input-title-icon'
            src={keywordsIcon}
            alt='#'
            aria-hidden={true}
          />
          <h4 className='find-news-tab-keyword-input-title'>
            Keywords or phrases you are interested in:
          </h4>
        </div>
        <InputComponent
          type='text'
          minLength={2}
          debounceTimeout={1000}
          placeholder={'Keyword...'}
          value={keyword}
          setValue={setKeyword}
          icon={magnifyingGlass}
        />
      </>

      {/* <div className='news-control'>
        <h4 className='select-title'>Selected country:</h4>
        {selectedCountries.map((country, index) => {
          const availableCountries = getNotSelectedItems(
            country,
            countriesAvailableForFilterNews,
            selectedCountries,
          );

          return (
            <SelectComponent
              key={index}
              valueOptions={availableCountries}
              labelOptions={labelOptionForCountries}
              labelIconOptions={labelIconOptionsForCountries}
              defaultValue={country}
              onChange={({ value }) => {
                if (!loading) {
                  updateSelectedItems(
                    index,
                    value,
                    selectedCountries,
                    setSelectedCountries,
                  );
                }
              }}
              isSearchable={true}
            />
          );
        })}
        <div className='select-controls'>
          {selectedCountries.length !== maxCountriesAvailableForFilterNews &&
            selectedCountries[0] !== 'all' && (
              <Button
                text='Add More Countries'
                onClick={() => {
                  if (!loading) {
                    addSelectWithNotSelectedValue(
                      selectedCountries,
                      countriesAvailableForFilterNews,
                      setSelectedCountries,
                    );
                  }
                }}
                buttonComponentIcon={AddCircleTwoTone}
              />
            )}
          {selectedCountries.length !== minCountriesAvailableForFilterNews && (
            <Button
              text='Remove Country'
              onClick={() => {
                if (!loading) {
                  removeLastSelect(selectedCountries, setSelectedCountries);
                }
              }}
              buttonComponentIcon={RemoveCircleTwoTone}
            />
          )}
        </div>
      </div> */}

      {/* <div className='news-control'>
        <h4 className='select-title'>Selected category:</h4>
        {selectedCategories.map((category, index) => {
          const availableCategories = getNotSelectedItems(
            category,
            Object.keys(categoriesAvailableForFilterNews),
            selectedCategories,
          );
          return (
            <SelectComponent
              key={index}
              valueOptions={availableCategories}
              labelIconOptions={categoriesAvailableForFilterNews}
              defaultValue={category}
              onChange={({ value }) => {
                if (!loading) {
                  updateSelectedItems(
                    index,
                    value,
                    selectedCategories,
                    setSelectedCategories,
                  );
                }
              }}
              isSearchable={true}
            />
          );
        })}
        <div className='select-controls'>
          {selectedCategories.length !== maxCategoriesAvailableForFilterNews &&
            selectedCategories[0] !== 'all' && (
              <Button
                text='Add More Categories'
                onClick={() => {
                  if (!loading) {
                    addSelectWithNotSelectedValue(
                      selectedCategories,
                      Object.keys(categoriesAvailableForFilterNews),
                      setSelectedCategories,
                    );
                  }
                }}
                buttonComponentIcon={AddCircleTwoTone}
              />
            )}
          {selectedCategories.length !==
            minCategoriesAvailableForFilterNews && (
            <Button
              text='Remove Category'
              onClick={() => {
                if (!loading) {
                  removeLastSelect(selectedCategories, setSelectedCategories);
                }
              }}
              buttonComponentIcon={RemoveCircleTwoTone}
            />
          )}
        </div>
      </div> */}

      {/* <div className='news-control'>
        <h4 className='select-title'>Selected languages:</h4>
        {selectedLanguages.map((language, index) => {
          const availableLanguages = getNotSelectedItems(
            language,
            Object.keys(languagesAvailableForFilterNews),
            selectedLanguages,
          );

          return (
            <SelectComponent
              key={index}
              valueOptions={availableLanguages}
              labelOptions={languagesAvailableForFilterNews}
              labelIconOptions={labelIconOptionsForLanguages}
              defaultValue={language}
              onChange={({ value }) => {
                if (!loading) {
                  updateSelectedItems(
                    index,
                    value,
                    selectedLanguages,
                    setSelectedLanguages,
                  );
                }
              }}
              isSearchable={true}
            />
          );
        })}
        <div className='select-controls'>
          {selectedLanguages.length !== maxLanguagesAvailableForFilterNews &&
            selectedLanguages[0] !== 'all' && (
              <Button
                text='Add More Languages'
                onClick={() => {
                  if (!loading) {
                    addSelectWithNotSelectedValue(
                      selectedLanguages,
                      Object.keys(languagesAvailableForFilterNews),
                      setSelectedLanguages,
                    );
                  }
                }}
                buttonComponentIcon={AddCircleTwoTone}
              />
            )}
          {selectedLanguages.length !== minLanguagesAvailableForFilterNews && (
            <Button
              text='Remove Language'
              onClick={() => {
                if (!loading) {
                  removeLastSelect(selectedLanguages, setSelectedLanguages);
                }
              }}
              buttonComponentIcon={RemoveCircleTwoTone}
            />
          )}
        </div>
      </div> */}
    </>
  );
};
