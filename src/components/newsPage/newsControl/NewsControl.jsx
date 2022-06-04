import './newsControl.css';

import { Help } from '@material-ui/icons';
import ReactFlagsSelect from "react-flags-select";
import { countries } from 'country-data';

import { isEmptyObject } from "../../../utils/isEmptyObject"
import { newsAvailableCountry } from '../../../constants/newsAvailableCountry';

import { Message } from '../../common/message/Message';
import { Button } from '../../common/button/Button'

export const NewsControl = ({ news, message, selectedCountry, setSelectedCountry }) => {
  const addCountry = () => {
    setSelectedCountry(selectedCountry => [...selectedCountry, 'UA'])
  }

  const changeCountry = (index, code) => {
    const updatedSelectedCountry = [...selectedCountry]
    updatedSelectedCountry[index] = code
    setSelectedCountry([...updatedSelectedCountry])
  }


  return (
    <section className='news-control'>
      {!isEmptyObject(message) && <Message type={message.type} title={message.title} text={message.text} />} :
      {news.length > 0 && (<><Help className='news-control-title-icon' />
        <h3 className='news-control-title'>What are you interesting in?</h3>

        <h4 className='country-select-title'>Selected country:</h4>
        {selectedCountry.map((country, index) => (
          <ReactFlagsSelect
            key={index}
            className='country-select'
            countries={newsAvailableCountry}
            selected={country}
            onSelect={(code) => changeCountry(index, code)}
            searchPlaceholder={countries[country].name}
          />
        ))}
        <div className="country-controls">
          <Button text='Add More Countries' onClick={addCountry} />
          <Button text='Remove Country' />
        </div>
      </>)
      }
    </section>
  );
};
