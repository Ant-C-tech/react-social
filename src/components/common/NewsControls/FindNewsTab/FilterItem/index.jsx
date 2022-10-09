import './styles.css';

import { AddCircleTwoTone, RemoveCircleTwoTone } from '@material-ui/icons';

import { getNotSelectedItems } from '@utils/newsControls/getNotSelectedItems';
import { updateSelectedItems } from '@utils/newsControls/updateSelectedItems';
import { removeLastSelect } from '@utils/newsControls/removeLastSelect';
import { addSelectWithNotSelectedValue } from '@utils/newsControls/addSelectWithNotSelectedValue';

import { SelectComponent } from '@common/SelectComponent';
import { Button } from '@common/Button/';

export const FilterItem = ({
  title,
  selectedItems,
  setSelectedItems,
  itemsAvailableForFilterNews,
  minItemsAvailableForFilterNews,
  maxItemsAvailableForFilterNews,
  labelOptionForItems,
  labelIconOptionsForItems,
  addButtonText,
  removeButtonText,
  loading,
}) => (
  <div className='filter-item'>
    <h4 className='filter-item-title'>{title}</h4>
    {selectedItems.map((item, index) => {
      const availableItems = getNotSelectedItems(
        item,
        itemsAvailableForFilterNews,
        selectedItems,
      );

      return (
        <SelectComponent
          key={index}
          valueOptions={availableItems}
          labelOptions={labelOptionForItems}
          labelIconOptions={labelIconOptionsForItems}
          defaultValue={item}
          onChange={({ value }) => {
            if (!loading) {
              updateSelectedItems(
                index,
                value,
                selectedItems,
                setSelectedItems,
              );
            }
          }}
          isSearchable={true}
        />
      );
    })}
    <div className='filter-item-controls'>
      {selectedItems.length !== maxItemsAvailableForFilterNews &&
        selectedItems[0] !== 'all' && (
          <Button
            text={addButtonText}
            onClick={() => {
              if (!loading) {
                addSelectWithNotSelectedValue(
                  selectedItems,
                  itemsAvailableForFilterNews,
                  setSelectedItems,
                );
              }
            }}
            buttonComponentIcon={AddCircleTwoTone}
          />
        )}
      {selectedItems.length !== minItemsAvailableForFilterNews && (
        <Button
          text={removeButtonText}
          onClick={() => {
            if (!loading) {
              removeLastSelect(selectedItems, setSelectedItems);
            }
          }}
          buttonComponentIcon={RemoveCircleTwoTone}
        />
      )}
    </div>
  </div>
);
