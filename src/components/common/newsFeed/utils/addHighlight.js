import { getUpdatedArrayOfHighlights } from './getUpdatedArrayOfHighlights';

export const addHighlight = (
  favoriteNews,
  setFavoriteNews,
  activeTool,
  link,
  targetPart,
) => {
  let indexOfTargetNews = 0;
  favoriteNews.forEach((news, index) => {
    if (news.link === link) indexOfTargetNews = index;
  });

  if (window.getSelection().toString().length > 0 && activeTool) {
    let onMouseDownTargetText;
    if (
      favoriteNews[indexOfTargetNews].highlights &&
      favoriteNews[indexOfTargetNews].highlights[targetPart]
    ) {
      onMouseDownTargetText =
        window.getSelection().anchorNode.parentElement.textContent;
    } else {
      onMouseDownTargetText = window.getSelection().baseNode.textContent;
    }
    const onMouseUpTargetText = window.getSelection().focusNode.textContent;

    // console.log('onMouseDownTargetText: ', onMouseDownTargetText);
    // console.log('onMouseUpTargetText: ', onMouseUpTargetText);

    const startSelection = window.getSelection().anchorOffset;
    const endSelection = window.getSelection().focusOffset;

    // console.log('startSelection', startSelection);
    // console.log('endSelection', endSelection);

    let startIndex;
    let endIndex;

    if (
      favoriteNews[indexOfTargetNews].highlights &&
      favoriteNews[indexOfTargetNews].highlights[targetPart]
    ) {
      const arrayOfChunks = Array.prototype.slice.call(
        window.getSelection().anchorNode.parentElement.parentElement.children,
      );

      let startIndexCounter = 0;
      let endIndexCounter = 0;
      let wasStartIndexFound = false;
      let wasEndIndexFound = false;

      arrayOfChunks.forEach((chunk) => {
        if (
          chunk.textContent !== onMouseDownTargetText &&
          chunk.textContent !== onMouseUpTargetText
        ) {
          // console.log(
          // 	'chunk.textContent !== onMouseDownTargetText && chunk.textContent !== onMouseUpTargetText',
          // );
          // console.log('startIndexCounter: ', startIndexCounter);
          // console.log('endIndexCounter: ', endIndexCounter);

          startIndexCounter = !wasStartIndexFound
            ? startIndexCounter + chunk.textContent.length
            : startIndexCounter;
          endIndexCounter = !wasEndIndexFound
            ? endIndexCounter + chunk.textContent.length
            : endIndexCounter;
        }

        if (
          chunk.textContent === onMouseDownTargetText &&
          chunk.textContent === onMouseUpTargetText
        ) {
          // console.log(
          // 	'chunk.textContent === onMouseDownTargetText && chunk.textContent === onMouseUpTargetText',
          // );
          // console.log('startIndexCounter: ', startIndexCounter);
          // console.log('endIndexCounter: ', endIndexCounter);

          startIndexCounter =
            startIndexCounter +
            (endSelection > startSelection ? startSelection : endSelection);
          endIndexCounter =
            endIndexCounter +
            (endSelection > startSelection ? endSelection : startSelection);
          wasStartIndexFound = true;
          wasEndIndexFound = true;
        }

        if (
          chunk.textContent === onMouseDownTargetText &&
          chunk.textContent !== onMouseUpTargetText
        ) {
          // console.log(
          // 	'chunk.textContent === onMouseDownTargetText && chunk.textContent !== onMouseUpTargetText',
          // );
          // console.log('startIndexCounter: ', startIndexCounter);
          // console.log('endIndexCounter: ', endIndexCounter);

          startIndexCounter = startIndexCounter + startSelection;
          endIndexCounter = !wasEndIndexFound
            ? endIndexCounter + chunk.textContent.length
            : endIndexCounter;
          wasStartIndexFound = true;
        }

        if (
          chunk.textContent !== onMouseDownTargetText &&
          chunk.textContent === onMouseUpTargetText
        ) {
          // console.log(
          // 	'chunk.textContent !== onMouseDownTargetText && chunk.textContent === onMouseUpTargetText',
          // );
          // console.log('startIndexCounter: ', startIndexCounter);
          // console.log('endIndexCounter: ', endIndexCounter);

          startIndexCounter = !wasStartIndexFound
            ? startIndexCounter + chunk.textContent.length
            : startIndexCounter;
          endIndexCounter = endIndexCounter + endSelection;
          wasEndIndexFound = true;
        }
      });
      startIndex =
        endIndexCounter > startIndexCounter
          ? startIndexCounter
          : endIndexCounter;
      endIndex =
        endIndexCounter > startIndexCounter
          ? endIndexCounter
          : startIndexCounter;
    } else {
      startIndex =
        startSelection < endSelection ? startSelection : endSelection;
      endIndex = startSelection < endSelection ? endSelection : startSelection;
    }

    const newHighlight = {
      highlighter: activeTool,
      startIndex: startIndex,
      endIndex: endIndex,
    };

    setFavoriteNews(
      favoriteNews.map((currentFavoriteNews, currentFavoriteNewsIndex) => {
        if (currentFavoriteNewsIndex === indexOfTargetNews) {
          !currentFavoriteNews.highlights &&
            (currentFavoriteNews['highlights'] = {});
          !currentFavoriteNews.highlights[targetPart] &&
            (currentFavoriteNews.highlights[targetPart] = []);

          // const additionalHighlight = {};

          // const updatedArrayOfHighlights = currentFavoriteNews.highlights[
          //   targetPart
          // ]
          //   .filter((highlight) => {
          //     if (
          //       highlight.startIndex < newHighlight.startIndex ||
          //       highlight.endIndex > newHighlight.endIndex
          //     ) {
          //       return highlight;
          //     } else {
          //       return false;
          //     }
          //   })
          //   .map((highlight) => {
          //     if (
          //       highlight.startIndex <= newHighlight.startIndex &&
          //       highlight.endIndex > newHighlight.startIndex &&
          //       highlight.endIndex <= newHighlight.endIndex
          //     ) {
          //       highlight.endIndex = newHighlight.startIndex;
          //     }
          //     if (
          //       highlight.startIndex >= newHighlight.startIndex &&
          //       highlight.startIndex < newHighlight.endIndex &&
          //       highlight.endIndex >= newHighlight.endIndex
          //     ) {
          //       highlight.startIndex = newHighlight.endIndex;
          //     }
          //     if (
          //       highlight.startIndex < newHighlight.startIndex &&
          //       highlight.endIndex > newHighlight.endIndex
          //     ) {
          //       additionalHighlight['highlighter'] = highlight.highlighter;
          //       additionalHighlight['startIndex'] =
          //         newHighlight.startIndex < newHighlight.endIndex
          //           ? newHighlight.endIndex
          //           : newHighlight.startIndex;
          //       additionalHighlight['endIndex'] =
          //         highlight.startIndex < highlight.endIndex
          //           ? highlight.endIndex
          //           : highlight.startIndex;

          //       highlight.endIndex = newHighlight.startIndex;
          //     }
          //     return highlight;
          //   });

          // if (Object.keys(additionalHighlight).length > 0) {
          //   updatedArrayOfHighlights.push(additionalHighlight);
          // }
          // updatedArrayOfHighlights.push(newHighlight);

          // currentFavoriteNews.highlights[targetPart] = updatedArrayOfHighlights;

          currentFavoriteNews.highlights[targetPart] =
            getUpdatedArrayOfHighlights(
              currentFavoriteNews.highlights[targetPart],
              newHighlight,
            );

          console.log(currentFavoriteNews.highlights[targetPart]);
          return currentFavoriteNews;
        } else {
          return currentFavoriteNews;
        }
      }),
    );
  }
};
