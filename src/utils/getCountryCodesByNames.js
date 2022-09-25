import { countries } from 'country-data';

export const getCountryCodesByNames = (countryNames) => {
  return [
    ...countryNames.map((countryName) => {
      let countryCode;
      countries.all.forEach((country) => {
        if (country.name.toLowerCase() === countryName) {
          countryCode = country.alpha2.toLowerCase();
        }

        switch (countryName) {
          case 'united states of america':
            countryCode = 'us';
            break;

          case 'netherland':
            countryCode = 'nl';
            break;

          case 'russia':
            countryCode = 'ru';
            break;

          case 'south korea':
            countryCode = 'kr';
            break;

          case 'venezuela':
            countryCode = 've';
            break;

          case 'united kingdom':
            countryCode = 'gb';
            break;

          default:
            break;
        }
      });
      return countryCode;
    }),
  ];
};
