import { DEFAULT_LANGUAGES_AVAILABLE_FOR_FILTERING_NEWS } from "@constants";

export const getNewsFilteredByLanguage = (news, selectedLanguages) => {
    const newsFilteredByLanguage = [];
    news.forEach((currentNews) => {
        let isCurrentNewsMatchesToFilterParameters = false;
        selectedLanguages.forEach((selectedLanguage) => {
            const selectedLanguageName =
                DEFAULT_LANGUAGES_AVAILABLE_FOR_FILTERING_NEWS[
                    selectedLanguage
                ];
            if (currentNews.language === selectedLanguageName.toLowerCase()) {
                isCurrentNewsMatchesToFilterParameters = true;
            }
        });
        if (isCurrentNewsMatchesToFilterParameters) {
            newsFilteredByLanguage.push(currentNews);
        }
    });

    return newsFilteredByLanguage;
};
