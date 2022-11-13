import './styles.css';
import eraser from '@assets/eraser-svgrepo-com.svg';
import highlightToolsIcon from '@assets/stationery.png';
import eraseToolIcon from '@assets/bin.png';

import { HIGHLIGHTERS } from './constants';

import { Button } from '@common/Button/';

export const EditNewsTab = ({ editNewsTabProps }) => {
  const { activeTool, setActiveTool } = editNewsTabProps;

  return (
    <>
      <img
        className='edit-news-tab-title-icon'
        src={highlightToolsIcon}
        alt='#'
        aria-hidden={true}
      />
      <h3 className='edit-news-tab-title'>
        Do You want to highlight something?
      </h3>
      <div className='edit-news-tab-control-toolbar'>
        {HIGHLIGHTERS.map((highlighter, index) => {
          const { name, icon } = highlighter;
          return (
            <Button
              key={index}
              active={name === activeTool}
              onClick={() => {
                setActiveTool(name === activeTool ? '' : name);
              }}
              buttonImageIcon={icon}
            />
          );
        })}
      </div>

      <img
        className='edit-news-tab-title-icon'
        src={eraseToolIcon}
        alt='#'
        aria-hidden={true}
      />
      <h3 className='edit-news-tab-title'>
        Do You want to delete some highlight?
      </h3>
      <div className='edit-news-tab-control-toolbar'>
        <Button
          active={'eraser' === activeTool}
          onClick={() => {
            setActiveTool('eraser' === activeTool ? '' : 'eraser');
          }}
          buttonImageIcon={eraser}
        />
      </div>
    </>
  );
};
