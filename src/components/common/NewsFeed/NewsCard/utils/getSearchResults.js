export const getSearchResults = (initialText, keywords) => {
    const searchResults = [];

    let searchCounter = 0;
    let isMatch = true;

    while (isMatch) {
        const searchResult = {
            highlighter: "search-highlight",
            startIndex: 0,
            endIndex: 0,
        };

        const firstMatch = initialText
            .toLowerCase()
            .split("")
            .slice(searchCounter)
            .join("")
            .search(keywords[0].toLowerCase());

        switch (firstMatch) {
            case -1:
                isMatch = false;
                break;

            default:
                searchResult.startIndex = firstMatch + searchCounter;
                searchResult.endIndex =
                    firstMatch + keywords[0].length + searchCounter;

                searchCounter = searchResult.endIndex;
                break;
        }

        if (searchResult.endIndex !== 0) {
            searchResults.push(searchResult);
        }
    }

    return searchResults;
};
