import businessIconSrc from '@assets/profit.png';
import environmentIconSrc from '@assets/hill.png';
import entertainmentIconSrc from '@assets/oscar.png';
import foodIconSrc from '@assets/burger.png';
import healthIconSrc from '@assets/blood-pressure.png';
import politicsIconSrc from '@assets/court.png';
import scienceIconSrc from '@assets/science.png';
import sportsIconSrc from '@assets/sports.png';
import technologyIconSrc from '@assets/cyborg.png';
import topIconSrc from '@assets/award.png';
import worldIconSrc from '@assets/globe.png';

const defaultCategories = [
  'all',
  'business',
  'entertainment',
  'environment',
  'food',
  'health',
  'politics',
  'science',
  'sports',
  'technology',
  'top',
  'world',
];

const iconsSrcs = [
  'all',
  businessIconSrc,
  entertainmentIconSrc,
  environmentIconSrc,
  foodIconSrc,
  healthIconSrc,
  politicsIconSrc,
  scienceIconSrc,
  sportsIconSrc,
  technologyIconSrc,
  topIconSrc,
  worldIconSrc,
];

export const DEFAULT_CATEGORIES_AVAILABLE_FOR_FILTERING_NEWS = {};

defaultCategories.forEach((category, index) => {
  const Icon = () => (
    <img
      src={iconsSrcs[index]}
      alt='#'
      style={{
        width: '40px',
        paddingRight: '10px',
        objectFit: 'contain',
      }}
      aria-hidden={true}
    />
  );
  DEFAULT_CATEGORIES_AVAILABLE_FOR_FILTERING_NEWS[category] = <Icon />;
});
