export const updateNewsControls = (
	selectedCountries,
	countriesAvailableForFilterFavoriteNews,
	setSelectedCountries,
) => {
	const updatedSelectedCountries = [];
	selectedCountries.forEach((selectedCountry) => {
		if (countriesAvailableForFilterFavoriteNews.includes(selectedCountry))
			updatedSelectedCountries.push(selectedCountry);
	});
	if (updatedSelectedCountries.length === 0) {
		updatedSelectedCountries.push('all')
	}
	setSelectedCountries(updatedSelectedCountries);
};
