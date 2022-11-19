import { countries } from 'country-data';

export const WORLD_COUNTRY_FLAGS_BY_LANGUAGE_CODE = {};

countries.all.forEach((country) => {
  let languageCode;
  switch (country.alpha2.toLowerCase()) {
    case 'uk':
      break;
    case 'cn':
      languageCode = 'zh';
      break;
    case 'cz':
      languageCode = 'cs';
      break;
    case 'gr':
      languageCode = 'el';
      break;
    case 'il':
      languageCode = 'he';
      break;
    case 'in':
      languageCode = 'hi';
      break;
    case 'id':
      languageCode = 'in';
      break;
    case 'kr':
      languageCode = 'ko';
      break;
    case 'ua':
      languageCode = 'uk';
      break;
    case 'gb':
      languageCode = 'en';
      break;
    case 'se':
      languageCode = 'sv';
      break;
    case 'sv':
      break;
    case 'si':
      languageCode = 'sl';
      break;
    case 'sl':
      break;
    case 'my':
      languageCode = 'ms';
      break;
    case 'ms':
      break;
    case 'ba':
      languageCode = 'bs';
      break;
    case 'bs':
      break;
    case 'rs':
      languageCode = 'sr';
      break;
    case 'sr':
      break;

    default:
      languageCode = country.alpha2.toLowerCase();
  }
  WORLD_COUNTRY_FLAGS_BY_LANGUAGE_CODE[languageCode] = country.emoji;
});
