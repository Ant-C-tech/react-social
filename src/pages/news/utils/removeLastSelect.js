export const removeLastSelect = ( setSelectedItems) => {
	setSelectedItems((selectedItems) => selectedItems.filter((_item, index) => index !== selectedItems.length - 1));
};
