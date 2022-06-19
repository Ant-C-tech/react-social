export const updateSelectedItems = (index, value, selectedItems, setSelectedItems) => {
	if (value !== 'all') {
		const updatedSelectedItems = [ ...selectedItems ];
		updatedSelectedItems[index] = value;
		setSelectedItems(updatedSelectedItems);
	} else {
		setSelectedItems([ value ]);
	}
};
