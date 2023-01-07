import './styles.css';
import {
  makeNoteIcon,
  stickyNoteIcon,
  highlightToolsIcon,
  eraserIcon,
} from '@assets';

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
        Do You want to highlight some text or remove some existing highlight?
      </h3>

      <div className='edit-news-tab-control-toolbar'>
        {HIGHLIGHTERS.map((highlighter, index) => {
          const { name, icon, tooltipText } = highlighter;
          return (
            <Button
              key={index}
              active={name === activeTool}
              onClick={() => {
                setActiveTool(name === activeTool ? '' : name);
              }}
              buttonImageIcon={icon}
              tooltipText={tooltipText}
            />
          );
        })}
        <Button
          active={'eraser' === activeTool}
          onClick={() => {
            setActiveTool('eraser' === activeTool ? '' : 'eraser');
          }}
          buttonImageIcon={eraserIcon}
          tooltipText='Remove an Existing Highlight'
        />
      </div>

      <img
        className='edit-news-tab-title-icon'
        src={makeNoteIcon}
        alt='#'
        aria-hidden={true}
      />
      <h3 className='edit-news-tab-title'>Do you want to create some note?</h3>
      <div className='edit-news-tab-control'>
        <Button
          text='Create Note'
          active={'note-creator' === activeTool}
          onClick={() => {
            setActiveTool('note-creator' === activeTool ? '' : 'note-creator');
          }}
          buttonImageIcon={stickyNoteIcon}
        />
      </div>
    </>
  );
};
