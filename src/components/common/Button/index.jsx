import './styles.css';

import uuid from 'react-uuid';

export const Button = ({
  text,
  active,
  id = uuid(),
  onClick,
  buttonImageIcon,
  buttonComponentIcon,
  tooltipText,
  inline = false,
}) => {
  const Icon = buttonComponentIcon;

  return (
    <button
      id={id}
      className={`button
		${!text ? 'button-without-text' : ''}
		${active ? 'button-active' : ''}
    ${inline ? 'inline-button' : ''}`}
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
