  export const updateSelectedItems = (index, value, selectedItems, setSelectedItems) => {
    const updatedSelectedItems = [...selectedItems]
    updatedSelectedItems[index] = value
    setSelectedItems(updatedSelectedItems)
  }
