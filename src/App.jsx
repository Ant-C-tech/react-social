import './app.css';

import { Page } from './pages/Page/Page';
import { NewsContent } from './content/newsContent/NewsContent';

function App() {
	return <Page content={<NewsContent />} />;
}

export default App;
