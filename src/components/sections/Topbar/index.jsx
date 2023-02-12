import './styles.css';
import { chatsIcon, eventsIcon } from '@assets';

import {
  MeetingRoomTwoTone,
} from '@material-ui/icons';
import { BigHead } from '@bigheads/core';

import { CustomLink } from '@common/CustomLink/';
import { IconButtonComponent } from '@common/IconButtonComponent/';

const topBarCenterLinksConfig = [
  { type: 'internal', text: 'Settings', path: 'organizer/settings' },
  { type: 'internal', text: 'Help', path: 'organizer/help' },
];

const topBarNotificationsConfig = [
  {
    type: 'internal',
    iconImage: chatsIcon,
    className: 'topbar-center-panel-notifications-image-icon',
    title: 'Chats notifications',
    path: 'organizer/chats',
    messageCounter: '6',
  },
  {
    type: 'internal',
    iconImage: eventsIcon,
    className: 'topbar-center-panel-notifications-image-icon',
    title: 'Events notifications',
    path: 'organizer/events',
    messageCounter: '2',
  },
];

const topBarRightLinksConfig = [
  { type: 'internal', text: 'SignUp', path: 'organizer/signup' },
  { type: 'internal', text: 'LogIn', path: 'organizer/login' },
];

export const TopBar = ({ isAuthorized, setIsAuthorized }) => {
  return (
    <header className='topbar'>
      <div className='topbar-left-panel'>
        <CustomLink
          type='internal'
          content='OrganiZeR'
          href='organizer/'
          modification='logo topbar-hover-underline'
        />
      </div>
      <div className='topbar-center-panel'>
        <div className='topbar-links-wrapper'>
          {topBarCenterLinksConfig.map((link, index) => (
            <CustomLink
              key={index}
              type={link.type}
              content={link.text}
              href={link.path}
              modification='topbar-hover-underline'
            />
          ))}
        </div>
        <div className='topbar-center-panel-notifications'>
          {topBarNotificationsConfig.map((notificationLink, index) => {
            const Icon = notificationLink['icon'];
            return (
              <CustomLink
                key={index}
                type={notificationLink.type}
                content={
                  <>
                    {Icon && <Icon fontSize='large' />}
                    {notificationLink.iconImage && (
                      <img
                        className={notificationLink.className}
                        src={notificationLink.iconImage}
                        alt='#'
                        aria-hidden={true}
                        title={notificationLink.title}
                      />
                    )}
                    <span className='topbar-center-panel-notifications-badge'>
                      {notificationLink.messageCounter}
                    </span>
                  </>
                }
                href={notificationLink.path}
                modification='topbar-hover-left-line'
              />
            );
          })}
        </div>
      </div>
      <div className='topbar-right-panel'>
        <div className='topbar-links-wrapper'>
          {topBarRightLinksConfig.map(
            (link, index) =>
              !isAuthorized && (
                <CustomLink
                  key={index}
                  type={link.type}
                  content={link.text}
                  href={link.path}
                  modification='topbar-hover-underline'
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
          content={<BigHead className='topbar-profile-image' />}
          href='/profile'
          modification='topbar-hover-left-line'
        />
      </div>
    </header>
  );
};
