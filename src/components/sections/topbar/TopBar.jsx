import './topbar.css';

import {
  ChatTwoTone,
  NotificationsTwoTone,
  MeetingRoomTwoTone,
} from '@material-ui/icons';
import { BigHead } from '@bigheads/core';

import { CustomLink } from '../../common/customLink/CustomLink';
import { IconButtonComponent } from '../../common/iconButtonComponent/iconButtonComponent';

const topBarCenterLinks = [
  { type: 'internal', text: 'Settings', path: 'organizer/settings' },
  { type: 'internal', text: 'Help', path: 'organizer/help' },
];

const topBarNotifications = [
  {
    type: 'internal',
    icon: ChatTwoTone,
    path: 'organizer/chats',
    messageCounter: '2',
  },
  {
    type: 'internal',
    icon: NotificationsTwoTone,
    path: 'organizer/events',
    messageCounter: '6',
  },
];

const topBarRightLinks = [
  { type: 'internal', text: 'SignUp', path: 'organizer/signup' },
  { type: 'internal', text: 'LogIn', path: 'organizer/login' },
];

export const TopBar = ({ isAuthorized, setIsAuthorized }) => {
  return (
    <header className='topbar container-flex'>
      <div className='topbar-left'>
        <CustomLink
          type='internal'
          content='OrganiZeR'
          href='organizer/'
          modification='logo hover-underline'
        />
      </div>
      <div className='topbar-center'>
        <div className='topbar-links'>
          {topBarCenterLinks.map((link, index) => (
            <CustomLink
              key={index}
              type={link.type}
              content={link.text}
              href={link.path}
              modification='hover-underline'
            />
          ))}
        </div>
        <div className='topbar-notifications'>
          {topBarNotifications.map((iconLink, index) => {
            const Icon = iconLink['icon'];
            return (
              <CustomLink
                key={index}
                type={iconLink.type}
                content={
                  <>
                    <Icon fontSize='large' />
                    <span className='icon-badge'>
                      {iconLink.messageCounter}
                    </span>
                  </>
                }
                href={iconLink.path}
                modification='hover-left-line'
              />
            );
          })}
        </div>
      </div>
      <div className='topbar-right'>
        <div className='topbar-links'>
          {topBarRightLinks.map(
            (link, index) =>
              !isAuthorized && (
                <CustomLink
                  key={index}
                  type={link.type}
                  content={link.text}
                  href={link.path}
                  modification='hover-underline'
                />
              ),
          )}
          {isAuthorized && (
            <IconButtonComponent onClick={() => setIsAuthorized(false)}>
              <MeetingRoomTwoTone fontSize='large' />
            </IconButtonComponent>
          )}
        </div>

        <CustomLink
          type='internal'
          content={<BigHead className='profile-image' />}
          href='/profile'
          modification='hover-left-line'
        />
      </div>
    </header>
  );
};
