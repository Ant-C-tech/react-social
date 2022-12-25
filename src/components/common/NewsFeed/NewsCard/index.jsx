import './styles.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {
  playVideoIcon,
  newsIcon,
  originalSourceIcon,
  addToFavoriteButtonIcon,
  removeIcon,
  readMoreButtonIcon,
  hideFullTextButtonIcon,
} from '@assets';

import { useState } from 'react';
import Highlighter from 'react-highlight-words';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CustomLink } from '@common/CustomLink/';
import { Button } from '@common/Button/';

import { getEditedHtmlStructure } from './utils';

export const NewsCard = ({
  createdFor,
  news,
  keywords,
  activeTool,
  isFavorite,
  addToFavorite,
  removeFromFavorite,
  addHighlight,
  addNote,
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
    notes
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
          <img
            className='news-card-icon news-card-title-icon'
            src={newsIcon}
            alt='#'
            aria-hidden={true}
          />
          <h2
            className={`news-card-content-title-text cursor-${activeTool}`}
            onMouseUp={() => {
              activeTool !== 'note-creator'
                ? addHighlight(link, 'title')
                : addNote(link, 'title');
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
              getEditedHtmlStructure(
                title,
                highlights && highlights['title'],
                notes && notes['title'],
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
                <img
                  className='news-card-icon'
                  src={playVideoIcon}
                  alt='#'
                  aria-hidden={true}
                />
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
            activeTool !== 'note-creator'
              ? addHighlight(link, 'description')
              : addNote(link, 'description');
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
            getEditedHtmlStructure(
              description,
              highlights && highlights['description'],
              notes && notes['description'],
              keywords,
            )
          ) : null}
        </p>

        {isContentShown && (
          <p
            className={`news-card-full-text cursor-${activeTool}`}
            onMouseUp={() => {
              activeTool !== 'note-creator'
                ? addHighlight(link, 'content')
                : addNote(link, 'content');
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
              getEditedHtmlStructure(
                content,
                highlights && highlights['content'],
                notes && notes['content'],
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
              buttonImageIcon={
                isContentShown ? hideFullTextButtonIcon : readMoreButtonIcon
              }
            />
          )}
          <CustomLink
            type='external'
            content={
              <>
                <img
                  className='news-card-icon'
                  src={originalSourceIcon}
                  alt='#'
                  aria-hidden={true}
                />
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
            buttonImageIcon={isFavorite ? removeIcon : addToFavoriteButtonIcon}
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
