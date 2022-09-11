import uuid from 'react-uuid';

export const getHighlightedStructure = (initialText, highlights) => {
	if (highlights && highlights.description) {
		const sortedDescriptionHighlights = highlights.description.sort((highlight1, highlight2) => {
			return highlight1.startIndex - highlight2.startIndex;
		});

		let highlightedStructure = [];
		const initialDescriptionArray = initialText.split('');

		let endOfPrevHighlightForParsing = 0;
		sortedDescriptionHighlights.forEach((highlight, index) => {
			if (highlight.startIndex === 0) {
				highlightedStructure.push(
					<span className={highlight.highlighter} key={uuid()}>
						{initialDescriptionArray.slice(highlight.startIndex, highlight.endIndex).join('')}
					</span>,
				);
				endOfPrevHighlightForParsing = highlight.endIndex;
			} else if (highlight.startIndex !== 0 && highlight.startIndex !== endOfPrevHighlightForParsing) {
				highlightedStructure.push(
					<span key={uuid()}>
						{initialDescriptionArray.slice(endOfPrevHighlightForParsing, highlight.startIndex).join('')}
					</span>,
				);
				highlightedStructure.push(
					<span className={highlight.highlighter} key={uuid()}>
						{initialDescriptionArray.slice(highlight.startIndex, highlight.endIndex).join('')}
					</span>,
				);
				endOfPrevHighlightForParsing = highlight.endIndex;
			} else {
				highlightedStructure.push(
					<span className={highlight.highlighter} key={uuid()}>
						{initialDescriptionArray.slice(highlight.startIndex, highlight.endIndex).join('')}
					</span>,
				);
				endOfPrevHighlightForParsing = highlight.endIndex;
			}
			if (
				index === sortedDescriptionHighlights.length - 1 &&
				highlight.endIndex !== initialDescriptionArray.length
			) {
				highlightedStructure.push(
					<span key={uuid()}>
						{initialDescriptionArray.slice(highlight.endIndex, initialDescriptionArray.length).join('')}
					</span>,
				);
			}
		});
		return highlightedStructure;
	} else {
		return initialText;
	}
};
