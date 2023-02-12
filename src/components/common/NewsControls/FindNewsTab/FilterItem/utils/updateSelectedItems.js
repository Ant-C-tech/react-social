export const updateSelectedItems = (
  index,
  value,
  selectedItems,
  setSelectedItems,
) => {
  if (typeof value === 'undefined') {
    return false;
  } else if (value !== 'all') {
    setSelectedItems(
      selectedItems.map((item, itemIndex) => {
        if (itemIndex === index) {
          return value;
        } else {
          return item;
        }
      }),
    );
  } else {
    setSelectedItems([value]);
  }
};
