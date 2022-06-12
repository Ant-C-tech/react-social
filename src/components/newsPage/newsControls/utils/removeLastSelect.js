  export const removeLastSelect = (selectedItems, setSelectedItems) => {
    setSelectedItems(selectedItems => selectedItems.splice(0, selectedItems.length - 1))
  }
