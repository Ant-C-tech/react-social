import './newsControl.css';

import { Help } from '@material-ui/icons';
import ReactFlagsSelect from "react-flags-select";

import { isMessage } from "../../../services/isMessage"
import { Message } from '../../common/message/Message';

export const NewsControl = ({ news, message, selectedCountry, setSelectedCountry }) => {
  return (
    <section className='news-control'>
      {isMessage(message) && <Message type={message.type} title={message.title} text={message.text} />} :
      {news.length > 0 && (<><Help className='news-control-title-icon' />
        <h3 className='news-control-title'>What are you interesting in?</h3>

        <h4 className='country-select-title'>Select country...</h4>
        <ReactFlagsSelect
          className='country-select'
          selected={selectedCountry}
          onSelect={(code) => setSelectedCountry(code)}
        /></>)}
    </section>
  );
};
