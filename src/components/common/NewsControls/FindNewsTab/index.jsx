import './style.css';

import {
  HelpTwoTone,
  // AddCircleTwoTone,
  // RemoveCircleTwoTone,
  SearchTwoTone,
} from '@material-ui/icons';

// import { getNotSelectedItems } from '@utils/newsControls/getNotSelectedItems';
// import { addSelectWithNotSelectedValue } from '@utils/newsControls/addSelectWithNotSelectedValue';
// import { removeLastSelect } from '@utils/newsControls/removeLastSelect';
// import { updateSelectedItems } from '@utils/newsControls/updateSelectedItems';
import { getAdditionalDataForNewsControls } from '@utils/newsControls/getAdditionalDataForNewsControls';

// import { Button } from '@common/Button/';
// import { SelectComponent } from '@common/SelectComponent';
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

  const {
    labelOptionForCountries,
    labelIconOptionsForCountries,
    labelIconOptionsForLanguages,
  } = getAdditionalDataForNewsControls();

  return (
    <>
      <HelpTwoTone fontSize='large' className='news-control-title-icon' />
      <h3 className='news-control-title'>
        Do You want to find something special?
      </h3>

      <FilterItem
        title='Selected country:'
        selectedItems={selectedCountries}
        setSelectedItems={setSelectedCountries}
        itemsAvailableForFilterNews={countriesAvailableForFilterNews}
        minItemsAvailableForFilterNews={minCountriesAvailableForFilterNews}
        maxItemsAvailableForFilterNews={maxCountriesAvailableForFilterNews}
        labelOptionForItems={labelOptionForCountries}
        labelIconOptionsForItems={labelIconOptionsForCountries}
        addButtonText='Add More Countries'
        removeButtonText='Remove Country'
        loading={loading}
      />

      <FilterItem
        title='Selected category:'
        selectedItems={selectedCategories}
        setSelectedItems={setSelectedCategories}
        itemsAvailableForFilterNews={Object.keys(
          categoriesAvailableForFilterNews,
        )}
        minItemsAvailableForFilterNews={minCategoriesAvailableForFilterNews}
        maxItemsAvailableForFilterNews={maxCategoriesAvailableForFilterNews}
        labelOptionForItems={null}
        labelIconOptionsForItems={categoriesAvailableForFilterNews}
        addButtonText='Add More Categories'
        removeButtonText='Remove Category'
        loading={loading}
      />

      <FilterItem
        title='Selected languages:'
        selectedItems={selectedLanguages}
        setSelectedItems={setSelectedLanguages}
        itemsAvailableForFilterNews={Object.keys(
          languagesAvailableForFilterNews,
        )}
        minItemsAvailableForFilterNews={minLanguagesAvailableForFilterNews}
        maxItemsAvailableForFilterNews={maxLanguagesAvailableForFilterNews}
        labelOptionForItems={languagesAvailableForFilterNews}
        labelIconOptionsForItems={labelIconOptionsForLanguages}
        addButtonText='Add More Languages'
        removeButtonText='Remove Language'
        loading={loading}
      />

      <div className='news-control'>
        <h4 className='select-title'>
          Keywords or phrases you are interested in:
        </h4>
        <InputComponent
          type='text'
          minLength={2}
          debounceTimeout={1000}
          placeholder={'Keyword...'}
          value={keyword}
          setValue={setKeyword}
          icon={SearchTwoTone}
        />
      </div>

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
