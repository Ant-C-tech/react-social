export const addSelectWithRandomNotSelectedValue = (selectedItems, itemBase, setSelectedItems) => {
	const rn = require('random-number');
	const gen = rn.generator({
		min: 0,
		max: itemBase.length,
		integer: true,
	});

	const indexesOfSelectedItems = selectedItems.map((country) => itemBase.indexOf(country));
	let indexOfRandomItem;
	do {
		indexOfRandomItem = gen();
	} while (indexesOfSelectedItems.indexOf(indexOfRandomItem) !== -1);
	setSelectedItems((selectedItems) => [
		...selectedItems,
		itemBase[indexOfRandomItem],
	]);
};
