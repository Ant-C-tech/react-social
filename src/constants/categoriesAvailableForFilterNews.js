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

const iconStyles = {
  width: '40px',
  paddingRight: '10px',
  objectFit: 'contain',
};

const BusinessIcon = () => (
  <img src={businessIconSrc} alt='#' style={iconStyles} aria-hidden={true} />
);

const EnvironmentIcon = () => (
  <img src={environmentIconSrc} alt='#' style={iconStyles} aria-hidden={true} />
);

const EntertainmentIcon = () => (
  <img
    src={entertainmentIconSrc}
    alt='#'
    style={iconStyles}
    aria-hidden={true}
  />
);

const FoodIcon = () => (
  <img src={foodIconSrc} alt='#' style={iconStyles} aria-hidden={true} />
);

const HealthIcon = () => (
  <img src={healthIconSrc} alt='#' style={iconStyles} aria-hidden={true} />
);

const PoliticsIcon = () => (
  <img src={politicsIconSrc} alt='#' style={iconStyles} aria-hidden={true} />
);

const ScienceIcon = () => (
  <img src={scienceIconSrc} alt='#' style={iconStyles} aria-hidden={true} />
);

const SportsIcon = () => (
  <img src={sportsIconSrc} alt='#' style={iconStyles} aria-hidden={true} />
);

const TechnologyIcon = () => (
  <img src={technologyIconSrc} alt='#' style={iconStyles} aria-hidden={true} />
);

const TopIcon = () => (
  <img src={topIconSrc} alt='#' style={iconStyles} aria-hidden={true} />
);

const WorldIcon = () => (
  <img src={worldIconSrc} alt='#' style={iconStyles} aria-hidden={true} />
);


export const categoriesAvailableForFilterNews = {
  all:'',
  business: <BusinessIcon />,
  entertainment: <EntertainmentIcon />,
  environment: <EnvironmentIcon />,
  food: <FoodIcon />,
  health: <HealthIcon />,
  politics: <PoliticsIcon />,
  science: <ScienceIcon />,
  sports: <SportsIcon />,
  technology: <TechnologyIcon />,
  top: <TopIcon />,
  world: <WorldIcon />,
};
