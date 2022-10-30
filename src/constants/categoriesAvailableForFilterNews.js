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

const categories = [
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

const categoriesIcons = [
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

const iconStyles = {
  width: '40px',
  paddingRight: '10px',
  objectFit: 'contain',
};

export const categoriesAvailableForFilterNews = {};

categories.forEach((category, index) => {
  const Icon = () => (
    <img
      src={categoriesIcons[index]}
      alt='#'
      style={iconStyles}
      aria-hidden={true}
    />
  );
  categoriesAvailableForFilterNews[category] = <Icon />;
});
