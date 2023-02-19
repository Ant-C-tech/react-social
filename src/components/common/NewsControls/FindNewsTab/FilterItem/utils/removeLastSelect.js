export const removeLastSelect = (selectedItems, setSelectedItems) => {
    setSelectedItems(
        selectedItems.filter(
            (_item, index) => index !== selectedItems.length - 1
        )
    );
};
