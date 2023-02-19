export const getIndexOfTargetNews = (favoriteNews, link) => {
    let indexOfTargetNews = 0;
    favoriteNews.forEach((news, index) => {
        if (news.link === link) indexOfTargetNews = index;
    });
    return indexOfTargetNews;
};
