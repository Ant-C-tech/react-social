import './styles.css';

import { useState } from 'react';

import { Message } from '@common/Message/';
import { TabsControls } from '@common/TabsControls';
import { TabPanel } from '@common/TabPanel';

import { createErrorMessage } from './utils/createErrorMessage';

import { FindNewsTab } from './FindNewsTab';
import { EditNewsTab } from './EditNewsTab';

export const NewsControls = (newsControlProps) => {
  const { news, error, loading, isHighLightersBar, setActiveTool } =
    newsControlProps;

  const errorMessage = error && createErrorMessage(news, error);

  const [currentTab, setCurrentTab] = useState(0);

  const changeTab = (_event, newTab) => {
    setCurrentTab(newTab);
    setActiveTool('');
  };

  return (
    <section className='news-controls'>
      {error ? (
        <Message type={errorMessage.type} title={errorMessage.title}>
          <p>{errorMessage.text}</p>
        </Message>
      ) : (
        !loading && (
          <>
            {isHighLightersBar && (
              <TabsControls
                tabs={['Find news', 'Edit news']}
                currentTab={currentTab}
                changeTab={changeTab}
              />
            )}

            <TabPanel value={currentTab} index={0}>
              <FindNewsTab findNewsTabProps={newsControlProps} />
            </TabPanel>

            <TabPanel value={currentTab} index={1}>
              <EditNewsTab editNewsTabProps={newsControlProps} />
            </TabPanel>
          </>
        )
      )}
    </section>
  );
};
