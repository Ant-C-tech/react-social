export const getNewsFilteredByCategory = (news, selectedCategories) => {
  const newsFilteredByCategory = [];
  news.forEach((currentNews) => {
    let isCurrentNewsMatchesToFilterParameters = false;
    selectedCategories.forEach((selectedCategory) => {
      if (currentNews.category.includes(selectedCategory)) {
        isCurrentNewsMatchesToFilterParameters = true;
      }
    });
    if (isCurrentNewsMatchesToFilterParameters) {
      newsFilteredByCategory.push(currentNews);
    }
  });
  return newsFilteredByCategory;
};
