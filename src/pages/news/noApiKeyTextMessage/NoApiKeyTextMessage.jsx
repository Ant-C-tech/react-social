import './noApiKeyTextMessage.css';

import { Bookmark } from '@material-ui/icons';

import { CustomLink } from '../../../components/common/customLink/CustomLink';

export const NoApiKeyTextMessage = () => {
  return (
    <div className="no-api-key">
      <p className="no-api-key-subtitle">Please, go to
        <CustomLink content={<><Bookmark /><span className='link-add-text'>NEWSDATA.IO</span></>} href='https://newsdata.io/' target='_blank' modification='hover-underline' active='' />
      </p>
      <ul className="no-api-key-description-list">
        <li className="no-api-key-description-list-item">Click to the "GET API KEY" button.</li>
        <li className="no-api-key-description-list-item">Then input your data and sign up.</li>
        <li className="no-api-key-description-list-item">Confirm your email and return to NEWSDATA.IO.</li>
        <li className="no-api-key-description-list-item">Login with your email and password.</li>
        <li className="no-api-key-description-list-item">Click on your profile and choose "Dashboard".</li>
        <li className="no-api-key-description-list-item">Chose tab "API Key" and copy your API key (it should looks like pub_7326b2c6fa87e39fae652402g354001d0bq8).</li>
        <li className="no-api-key-description">Now, please paste your API key into the field below and you will get hot news in a few seconds.</li>
      </ul>
    </div>
  )
}
