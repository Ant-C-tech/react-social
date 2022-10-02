import './navbar.css';

import newsIcon from '../../../assets/newspaper.png';
import favoriteNewsIcon from '../../../assets/inbox.png';

import { useState } from 'react';

import { BigHead } from '@bigheads/core';
import {
  ChatTwoTone,
  VideoLibraryTwoTone,
  NotesTwoTone,
  BookmarkTwoTone,
  WorkOutlineTwoTone,
  EventTwoTone,
  SchoolTwoTone,
  TranslateTwoTone,
  FormatListNumberedTwoTone,
  MusicNoteTwoTone,
  PeopleTwoTone,
} from '@material-ui/icons';

import { CustomLink } from '../../common/customLink/CustomLink';
import { Button } from '../../common/button/Button';

const navBarItems = [
  {
    type: 'internal',
    iconImage: newsIcon,
    className: 'link-image-icon',
    path: 'organizer/',
    text: 'News',
  },
  {
    type: 'internal',
    iconImage: favoriteNewsIcon,
    className: 'link-image-icon-small',
    path: 'organizer/favorite_news',
    text: 'My Favorite News',
  },
  {
    type: 'internal',
    icon: FormatListNumberedTwoTone,
    path: 'organizer/todo',
    text: 'ToDo',
  },
  {
    type: 'internal',
    icon: NotesTwoTone,
    path: 'organizer/notes',
    text: 'Notes',
  },
  {
    type: 'internal',
    icon: EventTwoTone,
    path: 'organizer/events',
    text: 'Events',
  },
  {
    type: 'internal',
    icon: TranslateTwoTone,
    path: 'organizer/translation',
    text: 'Translation',
  },
  {
    type: 'internal',
    icon: BookmarkTwoTone,
    path: 'organizer/bookmarks',
    text: 'Bookmarks',
  },
  {
    type: 'internal',
    icon: VideoLibraryTwoTone,
    path: 'organizer/videos',
    text: 'Videos',
  },
  {
    type: 'internal',
    icon: MusicNoteTwoTone,
    path: 'organizer/music',
    text: 'Music',
  },
  {
    type: 'internal',
    icon: WorkOutlineTwoTone,
    path: 'organizer/jobs',
    text: ' Jobs',
  },
  {
    type: 'internal',
    icon: SchoolTwoTone,
    path: 'organizer/courses',
    text: ' Courses',
  },
  {
    type: 'internal',
    icon: ChatTwoTone,
    path: 'organizer/chats',
    text: ' Chats',
  },
];

export const NavBar = ({ contacts }) => {
  const [isContactsShown, setIsContactsShown] = useState(false);

  return (
    <nav className='navbar'>
      <ul className='navbar-nav'>
        {navBarItems.map((navItem, index) => {
          const Icon = navItem['icon'];
          return (
            <li key={index} className='navbar-nav-item'>
              <CustomLink
                type={navItem.type}
                content={
                  <>
                    {Icon && <Icon fontSize='large' />}
                    {navItem.iconImage && (
                      <img
                        className={ navItem.className}
                        src={navItem.iconImage}
                        alt=''
                      />
                    )}
                    <span className='link-add-text'>{navItem.text}</span>
                  </>
                }
                href={navItem.path}
                modification='hover-left-line'
              />
            </li>
          );
        })}
      </ul>
      <hr />
      <Button
        text={isContactsShown ? 'Hide Contacts' : 'Show Contacts'}
        className='read-more-button'
        onClick={() => setIsContactsShown((prevState) => !prevState)}
        buttonComponentIcon={PeopleTwoTone}
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
                    <span className='link-add-text'>{contact}</span>
                  </>
                }
                href={`organizer/contact/${index}`}
                modification='hover-left-line'
                text={contact}
              />
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};
