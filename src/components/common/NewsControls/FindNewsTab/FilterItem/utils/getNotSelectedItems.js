export const getNotSelectedItems = (currentItem, itemBase, selectedItems) => {
    const itemsAvailableForSelecting = itemBase.filter(
        (item) => selectedItems.indexOf(item) === -1
    );
    itemsAvailableForSelecting.push(currentItem);

    return itemsAvailableForSelecting;
};
