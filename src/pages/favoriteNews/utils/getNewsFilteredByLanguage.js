import { languagesAvailableForFilterNews } from '../../../constants/languagesAvailableForFilterNews';

export const getNewsFilteredByLanguage = (news, selectedLanguages) => {
const newsFilteredByLanguage = [];
		news.forEach((currentNews) => {
			let isCurrentNewsMatchesToFilterParameters = false;
      selectedLanguages.forEach((selectedLanguage) => {
        const selectedLanguageName = languagesAvailableForFilterNews[selectedLanguage]
				if (currentNews.language === selectedLanguageName.toLowerCase()) {
					isCurrentNewsMatchesToFilterParameters = true;
				}
			});
			if (isCurrentNewsMatchesToFilterParameters) {
				newsFilteredByLanguage.push(currentNews);
			}
    });

  return newsFilteredByLanguage;
}
