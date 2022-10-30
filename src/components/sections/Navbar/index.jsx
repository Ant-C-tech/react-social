import './styles.css';

import newsIcon from '@assets/newspaper.png';
import favoriteNewsIcon from '@assets/inbox.png';
import jobsIcon from '@assets/money.png';
import musicIcon from '@assets/music.png';
import booksIcon from '@assets/bookshelf.png';
import todoIcon from '@assets/rules.png';
import notesIcon from '@assets/reminder.png';
import eventsIcon from '@assets/calendar.png';
import translationIcon from '@assets/translation.png';
import chatsIcon from '@assets/comment.png';
import photosIcon from '@assets/photo.png';
import videosIcon from '@assets/film.png';
import contactsButtonIcon from '@assets/member.png';

import { useState } from 'react';

import { BigHead } from '@bigheads/core';

import { CustomLink } from '@common/CustomLink/';
import { Button } from '@common/Button';

const navBarItemsConfig = [
  {
    type: 'internal',
    iconImage: newsIcon,
    className: 'navbar-link-image-icon',
    path: 'organizer/',
    text: 'News',
  },
  {
    type: 'internal',
    iconImage: favoriteNewsIcon,
    className: 'navbar-link-image-icon',
    path: 'organizer/favorite_news',
    text: 'My Favorite News',
  },
  {
    type: 'internal',
    iconImage: todoIcon,
    className: 'navbar-link-image-icon',
    path: 'organizer/todo',
    text: 'ToDo',
  },
  {
    type: 'internal',
    iconImage: notesIcon,
    className: 'navbar-link-image-icon',
    path: 'organizer/notes',
    text: 'Notes',
  },
  {
    type: 'internal',
    iconImage: eventsIcon,
    className: 'navbar-link-image-icon',
    path: 'organizer/events',
    text: 'Events',
  },
  {
    type: 'internal',
    iconImage: translationIcon,
    className: 'navbar-link-image-icon',
    path: 'organizer/translation',
    text: 'Translation',
  },
  {
    type: 'internal',
    iconImage: photosIcon,
    className: 'navbar-link-image-icon',
    path: 'organizer/photos',
    text: 'Photos',
  },
  {
    type: 'internal',
    iconImage: videosIcon,
    className: 'navbar-link-image-icon',
    path: 'organizer/videos',
    text: 'Videos',
  },
  {
    type: 'internal',
    iconImage: musicIcon,
    className: 'navbar-link-image-icon',
    path: 'organizer/music',
    text: 'Music',
  },
  {
    type: 'internal',
    iconImage: jobsIcon,
    className: 'navbar-link-image-icon',
    path: 'organizer/jobs',
    text: ' Jobs',
  },
  {
    type: 'internal',
    iconImage: booksIcon,
    className: 'navbar-link-image-icon',
    path: 'organizer/books',
    text: ' Books',
  },
  {
    type: 'internal',
    iconImage: chatsIcon,
    className: 'navbar-link-image-icon',
    path: 'organizer/chats',
    text: ' Chats',
  },
];

export const NavBar = ({ contacts }) => {
  const [isContactsShown, setIsContactsShown] = useState(false);

  return (
    <nav className='navbar'>
      <ul className='navbar-nav'>
        {navBarItemsConfig.map((navItem, index) => {
          // const Icon = navItem['icon'];
          return (
            <li key={index} className='navbar-nav-item'>
              <CustomLink
                type={navItem.type}
                content={
                  <>
                    {/* {Icon && <Icon fontSize='large' />} */}
                    {navItem.iconImage && (
                      <img
                        className={navItem.className}
                        src={navItem.iconImage}
                        alt='#'
                        aria-hidden={true}
                      />
                    )}
                    <span className='navbar-link-add-text'>{navItem.text}</span>
                  </>
                }
                href={navItem.path}
                modification='navbar-hover-left-line'
              />
            </li>
          );
        })}
      </ul>
      <hr className='navbar-divider' />
      <Button
        text={isContactsShown ? 'Hide Contacts' : 'Show Contacts'}
        onClick={() => setIsContactsShown((prevState) => !prevState)}
        buttonImageIcon={contactsButtonIcon}
      />
      {isContactsShown && (
        <ul className='navbar-contacts'>
          {contacts.map((contact, index) => (
            <li key={index} className='navbar-contact'>
              <CustomLink
                type='internal'
                content={
                  <>
                    <BigHead className='navbar-contact-image' />
                    <span className='navbar-link-add-text'>{contact}</span>
                  </>
                }
                href={`organizer/contact/${index}`}
                modification='navbar-hover-left-line'
                text={contact}
              />
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};
