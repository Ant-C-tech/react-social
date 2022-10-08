import './style.css';
import eraser from '@assets/eraser-svgrepo-com.svg';

import { DeleteForeverTwoTone, BorderColorTwoTone } from '@material-ui/icons';

import { highlighters } from '@constants/NewsControls/highlighters';

import { Button } from '@common/Button/';

export const EditNewsTab = ({ editNewsTabProps }) => {
  const { activeTool, setActiveTool } = editNewsTabProps;

  return (
    <>
      <BorderColorTwoTone
        fontSize='large'
        className='news-control-title-icon'
      />
      <h3 className='news-control-title'>
        Do You want to highlight something?
      </h3>
      <div className='news-control'>
        <div className='news-control-toolbar'>
          {highlighters.map((highlighter, index) => {
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
      </div>

      <DeleteForeverTwoTone
        fontSize='large'
        className='news-control-title-icon'
      />
      <h3 className='news-control-title'>
        Do You want to delete some highlight?
      </h3>
      <div className='news-control'>
        <div className='news-control-toolbar'>
          <Button
            active={'eraser' === activeTool}
            onClick={() => {
              setActiveTool('eraser' === activeTool ? '' : 'eraser');
            }}
            buttonImageIcon={eraser}
          />
        </div>
      </div>
    </>
  );
};
