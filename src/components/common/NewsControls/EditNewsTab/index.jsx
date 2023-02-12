import './styles.css';
import {
  makeNoteIcon,
  stickyNoteIcon,
  highlightToolsIcon,
  eraserIcon,
} from '@assets';

import { HIGHLIGHTERS } from './constants';

import { Button } from '@common/';
import { NoteTextArea } from './NoteTextArea';

export const EditNewsTab = ({ editNewsTabProps }) => {
  const { activeTool, setActiveTool, textOfNoteCard, setTextOfNoteCard, setOpenNoteId } =
    editNewsTabProps;

  return (
    <>
      <img
        className='edit-news-tab-title-icon'
        src={highlightToolsIcon}
        alt='#'
        aria-hidden={true}
      />
      <h4 className='edit-news-tab-title'>
        Do You want to highlight some text or remove some existing highlight?
      </h4>

      <div className='edit-news-tab-control-toolbar'>
        {HIGHLIGHTERS.map((highlighter, index) => {
          const { name, icon, tooltipText } = highlighter;
          return (
            <Button
              key={index}
              active={name === activeTool}
              onClick={() => {
                setActiveTool(name === activeTool ? '' : name);
                setOpenNoteId('')
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
            setOpenNoteId('');
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
      <h4 className='edit-news-tab-title'>Do you want to create some note?</h4>
      <div className='edit-news-tab-control'>
        <Button
          text='Create Note'
          active={'note-creator' === activeTool}
          onClick={() => {
            setActiveTool('note-creator' === activeTool ? '' : 'note-creator');
            setOpenNoteId('');
          }}
          buttonImageIcon={stickyNoteIcon}
        />
      </div>
      {'note-creator' === activeTool && (
        <div className='edit-news-tab-control'>
          <NoteTextArea text={textOfNoteCard} setText={setTextOfNoteCard} />
        </div>
      )}
    </>
  );
};
