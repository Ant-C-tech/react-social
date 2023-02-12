export const addSelectWithNotSelectedValue = (
  selectedItems,
  itemBase,
  setSelectedItems,
) => {
  const availableItems = itemBase.filter(
    (item) => selectedItems.indexOf(item) === -1,
  );
  setSelectedItems([...selectedItems, availableItems[1]]);
};
