import { LANGUAGES_DATA } from "@constants";

export const getNewsFilteredByLanguage = (news, selectedLanguages) => {
    const newsFilteredByLanguage = [];
    news.forEach((currentNews) => {
        let isCurrentNewsMatchesToFilterParameters = false;
        selectedLanguages.forEach((selectedLanguage) => {
            const selectedLanguageName = LANGUAGES_DATA[selectedLanguage].name;
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
