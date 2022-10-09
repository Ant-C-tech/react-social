import './styles.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { useState } from 'react';
import Highlighter from 'react-highlight-words';
import {
  BookmarkTwoTone,
  OndemandVideoTwoTone,
  FiberNewTwoTone,
  MenuBookTwoTone,
  CancelPresentationTwoTone,
  FolderSpecialTwoTone,
  RemoveCircleTwoTone,
} from '@material-ui/icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { CustomLink } from '@common/CustomLink/';
import { Button } from '@common/Button/';

import { getHighlightedStructure } from '@utils/newsFeed/getHighlightedStructure';

export const NewsCard = ({
  createdFor,
  news,
  keywords,
  activeTool,
  isFavorite,
  addToFavorite,
  removeFromFavorite,
  addHighlight,
}) => {
  const [isContentShown, setIsContentShown] = useState(false);

  const {
    title,
    link,
    creator,
    video_url,
    description,
    content,
    pubDate,
    image_url,
    source_id,
    country,
    category,
    language,
    highlights,
  } = news;

  return (
    <article className='news-card'>
      <header className='news-card-header'>
        {category && (
          <div className='news-card-category'>
            {category.map((currentCategory, index) => (
              <h3 key={index}>{currentCategory}</h3>
            ))}
          </div>
        )}
        {country && (
          <div className='news-card-country'>
            {country.map((currentCountry, index) => (
              <h3 key={index}>{currentCountry}</h3>
            ))}
          </div>
        )}
      </header>

      <div className={`news-card-content ${language}`}>
        <div className='news-card-content-title'>
          <FiberNewTwoTone
            fontSize='large'
            className='news-card-content-title-icon'
          />
          <h2
            className={`news-card-content-title-text cursor-${activeTool}`}
            onMouseUp={() => {
              addHighlight(link, 'title');
            }}
          >
            {createdFor === 'news' ? (
              <Highlighter
                highlightClassName='news-card-highlight'
                searchWords={keywords}
                autoEscape={true}
                textToHighlight={title || ''}
              />
            ) : title ? (
              getHighlightedStructure(
                title,
                highlights && highlights['title'],
                keywords,
              )
            ) : null}
          </h2>
        </div>

        {image_url && (
          <LazyLoadImage
            className='news-card-image'
            wrapperClassName='news-card-image-wrapper'
            effect='blur'
            src={image_url}
            alt={title}
          />
        )}

        {video_url && (
          <CustomLink
            type='external'
            content={
              <>
                <OndemandVideoTwoTone />
                <span className='news-card-link-add-text'>Watch Now</span>
              </>
            }
            href={video_url}
            target='_blank'
            modification='news-card-hover-left-line'
            active=''
          />
        )}

        <p
          className={`news-card-description cursor-${activeTool}`}
          onMouseUp={() => {
            addHighlight(link, 'description');
          }}
        >
          {createdFor === 'news' ? (
            <Highlighter
              highlightClassName='news-card-highlight'
              searchWords={keywords}
              autoEscape={true}
              textToHighlight={description || ''}
            />
          ) : description ? (
            getHighlightedStructure(
              description,
              highlights && highlights['description'],
              keywords,
            )
          ) : null}
        </p>

        {isContentShown && (
          <p
            className={`news-card-full-text cursor-${activeTool}`}
            onMouseUp={() => {
              addHighlight(link, 'content');
            }}
          >
            {createdFor === 'news' ? (
              <Highlighter
                highlightClassName='news-card-highlight'
                searchWords={keywords}
                autoEscape={true}
                textToHighlight={content || ''}
              />
            ) : content ? (
              getHighlightedStructure(
                content,
                highlights && highlights['content'],
                keywords,
              )
            ) : null}
          </p>
        )}

        <div className='news-card-controls'>
          {content && (
            <Button
              text={isContentShown ? 'Hide full text' : 'Read More'}
              onClick={() => setIsContentShown((prevState) => !prevState)}
              buttonComponentIcon={
                isContentShown ? CancelPresentationTwoTone : MenuBookTwoTone
              }
            />
          )}
          <CustomLink
            type='external'
            content={
              <>
                <BookmarkTwoTone />
                <span className='news-card-link-add-text'>
                  Visit original source...
                </span>
              </>
            }
            href={link}
            target='_blank'
            modification='news-card-link-hover-underline'
            active=''
          />
          <Button
            text={isFavorite ? 'Remove from favorite' : 'Add to favorite'}
            onClick={() => {
              isFavorite ? removeFromFavorite() : addToFavorite();
            }}
            buttonComponentIcon={
              isFavorite ? RemoveCircleTwoTone : FolderSpecialTwoTone
            }
          />
        </div>
      </div>

      <footer className='news-card-footer'>
        <p className='news-card-date'>{pubDate}</p>
        {(creator || source_id) && (
          <div className={`news-card-creators ${language}`}>
            {creator
              ? creator.map((currentCreator, index) => (
                  <p key={index}>{currentCreator}</p>
                ))
              : source_id && <p>{source_id}</p>}
          </div>
        )}
      </footer>
    </article>
  );
};
