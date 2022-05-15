import './apiKeyInput.css';

import {
	Bookmark
} from '@material-ui/icons';

import { CustomLink } from '../customLink/CustomLink';

export const ApiKeyInput = ({ APIkeyFor, apiKey, setApiKey }) => {
	return (
		<section className="warning">
			<h2 className="api-key-input-title">You need API key for getting {APIkeyFor}.</h2>
			<div className="api-input-description-section">
				<p className="api-key-input-description">Please, go to {<CustomLink
					content={<Bookmark />}
					href='https://newsdata.io/'
					target='_blank'
					modification='icon'
					text={'NEWSDATA.IO'}
					active=''
				/>} and click to the "GET API KEY" button.</p>
				<p className="api-key-input-description">Then input your data and sign up.</p>
				<p className="api-key-input-description">Confirm your email and return to NEWSDATA.IO.</p>
				<p className="api-key-input-description">Login with your email and password.</p>
				<p className="api-key-input-description">Click on your profile and choose "Dashboard".</p>
				<p className="api-key-input-description">Chose tab "API Key" and copy your API key (it should looks like pub_7326b2c6fa87e39fae652402g354001d0bq8).</p>
				<p className="api-key-input-description">Now, please paste your API key into the field below and you will get hot news in a few seconds.</p>
			</div>
			<input type="text" className='api-key-input' placeholder="Please, input your API key" value={apiKey} onChange={e => setApiKey(e.target.value)} />
		</section>
	)
};
