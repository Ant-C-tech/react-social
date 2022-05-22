import './newsControl.css';

import { Help } from '@material-ui/icons';
import ReactFlagsSelect from "react-flags-select";

import { Message } from '../../common/message/Message';

export const NewsControl = ({ message, selectedCountry, setSelectedCountry }) => {
  const isMessage = Object.keys(message).length > 0

  return (
    <section className='news-control'>
      {isMessage && <Message type={message.type} title={message.title} text={message.text} />}
      <Help className='news-control-title-icon' />
      <h3 className='news-control-title'>What are you interesting in?</h3>

      <h4 className='country-select-title'>Select country...</h4>
      <ReactFlagsSelect
        className='country-select'
        selected={selectedCountry}
        onSelect={(code) => setSelectedCountry(code)}
      />
    </section>
  );
};
