import { getCountryCodesByNames } from '@utils/getCountryCodesByNames';

import { WORLD_COUNTRY_NAMES, WORLD_COUNTRY_FLAGS } from '@constants';

export const getCountriesForPrompt = (newsForPrompt) => {
  const countryCodesForPrompt = [];
  newsForPrompt.forEach((news) => {
    news.country.forEach((countryItem) => {
      countryCodesForPrompt.push(countryItem);
    });
  });
  const uniqCountryCodesForPrompt = [...new Set(countryCodesForPrompt)];

  const countriesForPrompt = uniqCountryCodesForPrompt.map((country) => {
    const countryCode = getCountryCodesByNames([country]);
    return [WORLD_COUNTRY_FLAGS[countryCode], WORLD_COUNTRY_NAMES[countryCode]];
  });
  return countriesForPrompt;
};
