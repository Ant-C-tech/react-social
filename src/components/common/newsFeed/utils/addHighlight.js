export const addHighlight = (favoriteNews, activeHighlighter, indexOfTargetNews, setFavoriteNews, targetPart) => {
	if (window.getSelection().toString().length > 0 && activeHighlighter) {
		let parentText;
		if (favoriteNews[indexOfTargetNews].highlights && favoriteNews[indexOfTargetNews].highlights[targetPart]) {
			parentText = window.getSelection().anchorNode.parentElement.textContent;
		} else {
			parentText = window.getSelection().baseNode.textContent;
		}

		const startSelection = window.getSelection().anchorOffset;
		const endSelection = window.getSelection().focusOffset;

		let startIndex;
		let endIndex;

		if (favoriteNews[indexOfTargetNews].highlights && favoriteNews[indexOfTargetNews].highlights[targetPart]) {
			const arrayOfChunks = Array.prototype.slice.call(
				window.getSelection().anchorNode.parentElement.parentElement.children,
      );

			let startIndexCounter = 0;
			let endIndexCounter = 0;
			let foundTargetChunk = false;
			arrayOfChunks.forEach((chunk) => {
				if (chunk.textContent !== parentText && !foundTargetChunk) {
					startIndexCounter = startIndexCounter + chunk.textContent.length;
					endIndexCounter = endIndexCounter + chunk.textContent.length;
        }

        console.log('parentText ', parentText);
        console.log(chunk.textContent);

        if (chunk.textContent === parentText) {
					foundTargetChunk = true;
					startIndexCounter =
						startIndexCounter + (startSelection < endSelection ? startSelection : endSelection);
					endIndexCounter = endIndexCounter + (startSelection < endSelection ? endSelection : startSelection);
        }
      });
      startIndex = startIndexCounter;
			endIndex = endIndexCounter;
		} else {
			startIndex = startSelection < endSelection ? startSelection : endSelection;
			endIndex = startSelection < endSelection ? endSelection : startSelection;
		}

		const newHighlight = {
			highlighter: activeHighlighter,
			startIndex: startIndex,
			endIndex: endIndex,
		};

		setFavoriteNews(
			favoriteNews.map((currentFavoriteNews, currentFavoriteNewsIndex) => {
				if (currentFavoriteNewsIndex === indexOfTargetNews) {
					!currentFavoriteNews.highlights && (currentFavoriteNews['highlights'] = {});
					!currentFavoriteNews.highlights[targetPart] && (currentFavoriteNews.highlights[targetPart] = []);

					const additionalHighlight = {};

					const updatedArrayOfHighlights = currentFavoriteNews.highlights[targetPart]
						.filter((highlight) => {
							if (
								highlight.startIndex < newHighlight.startIndex ||
								highlight.endIndex > newHighlight.endIndex
							) {
								return highlight;
							} else {
								return false;
							}
						})
						.map((highlight) => {
							if (
								highlight.startIndex < newHighlight.startIndex &&
								highlight.endIndex > newHighlight.startIndex &&
								highlight.endIndex < newHighlight.endIndex
							) {
								highlight.endIndex = newHighlight.startIndex;
							}
							if (
								highlight.startIndex > newHighlight.startIndex &&
								highlight.startIndex < newHighlight.endIndex &&
								highlight.endIndex > newHighlight.endIndex
							) {
								highlight.startIndex = newHighlight.endIndex;
							}
							if (
								highlight.startIndex < newHighlight.startIndex &&
								highlight.endIndex > newHighlight.endIndex
							) {
								additionalHighlight['highlighter'] = highlight.highlighter;
								additionalHighlight['startIndex'] =
									newHighlight.startIndex < newHighlight.endIndex
										? newHighlight.endIndex
										: newHighlight.startIndex;
								additionalHighlight['endIndex'] =
									highlight.startIndex < highlight.endIndex
										? highlight.endIndex
										: highlight.startIndex;

								highlight.endIndex = newHighlight.startIndex;
							}
							return highlight;
						});

					if (Object.keys(additionalHighlight).length > 0) {
						updatedArrayOfHighlights.push(additionalHighlight);
					}
					updatedArrayOfHighlights.push(newHighlight);

          currentFavoriteNews.highlights[targetPart] = updatedArrayOfHighlights;

          console.log(currentFavoriteNews.highlights[targetPart]);
					return currentFavoriteNews;
				} else {
					return currentFavoriteNews;
				}
			}),
		);
	}
};
