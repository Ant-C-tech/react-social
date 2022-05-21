import './inputLegend.css';

import {
  Bookmark
} from '@material-ui/icons';

import { CustomLink } from '../../../common/customLink/CustomLink';

export const InputLegend = () => {
  return (
    <>
      <h2 className="input-legend-title">You need API key for getting news.</h2>
      <p className="input-legend-subtitle">Please, go to {<CustomLink
        content={<Bookmark />}
        href='https://newsdata.io/'
        target='_blank'
        modification='icon'
        text={'NEWSDATA.IO'}
        active=''
      />}</p>
      <ul className="input-legend-description-list">
        <li className="input-legend-description-list-item">Click to the "GET API KEY" button.</li>
        <li className="input-legend-description-list-item">Then input your data and sign up.</li>
        <li className="input-legend-description-list-item">Confirm your email and return to NEWSDATA.IO.</li>
        <li className="input-legend-description-list-item">Login with your email and password.</li>
        <li className="input-legend-description-list-item">Click on your profile and choose "Dashboard".</li>
        <li className="input-legend-description-list-item">Chose tab "API Key" and copy your API key (it should looks like pub_7326b2c6fa87e39fae652402g354001d0bq8).</li>
        <li className="input-legend-description">Now, please paste your API key into the field below and you will get hot news in a few seconds.</li>
      </ul>
    </>
  )
}
