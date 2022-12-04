import './styles.css';

export const Button = ({
  text,
  active,
  onClick,
  buttonImageIcon,
  buttonComponentIcon,
  tooltipText
}) => {
  const Icon = buttonComponentIcon;

  return (
    <button
      className={`button
		${!text ? 'button-without-text' : ''}
		${active ? 'button-active' : ''}`}
      onClick={onClick}
      title={tooltipText}
    >
      {buttonComponentIcon && <Icon className='button-component-icon' />}
      {buttonImageIcon && (
        <img
          className='button-image-icon'
          src={buttonImageIcon}
          alt='#'
          aria-hidden={true}
        />
      )}
      {text && <span className='button-text'>{text}</span>}
    </button>
  );
};
