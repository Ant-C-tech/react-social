import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './index.css';

import { CradleLoader } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className='loader-wrapper'>
      <CradleLoader />
    </div>
  );
};
