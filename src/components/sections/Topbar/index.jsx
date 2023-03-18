import "./styles.css";
import { chatsIcon, eventsIcon, exitIcon } from "@assets";

import React from "react";
import { BigHead } from "@bigheads/core";

import { CustomLink, ButtonSmall } from "@common";

const topBarCenterLinksConfig = [
    { type: "internal", text: "Settings", path: "organizer/settings" },
    { type: "internal", text: "Help", path: "organizer/help" },
];

const topBarNotificationsConfig = [
    {
        type: "internal",
        iconImage: chatsIcon,
        title: "Chats notifications",
        path: "organizer/chats",
        messageCounter: "6",
    },
    {
        type: "internal",
        iconImage: eventsIcon,
        title: "Events notifications",
        path: "organizer/events",
        messageCounter: "2",
    },
];

const topBarRightLinksConfig = [
    { type: "internal", text: "SignUp", path: "organizer/signup" },
    { type: "internal", text: "LogIn", path: "organizer/login" },
];

export const TopBar = ({ isAuthorized, setIsAuthorized }) => {
    return (
        <header className="topbar">
            <div className="topbar-left-panel">
                <div className="logo">
                    <CustomLink
                        type="internal"
                        content={<>OrganiZeR</>}
                        href="organizer/"
                        hover="underline"
                    />
                </div>
            </div>
            <div className="topbar-center-panel">
                <div className="topbar-links-wrapper">
                    {topBarCenterLinksConfig.map((link, index) => (
                        <CustomLink
                            key={index}
                            type={link.type}
                            content={<>{link.text}</>}
                            href={link.path}
                            hover="underline"
                        />
                    ))}
                </div>
                <div className="topbar-center-panel-notifications">
                    {topBarNotificationsConfig.map(
                        (notificationLink, index) => {
                            // const Icon = notificationLink["icon"];
                            return (
                                <CustomLink
                                    key={index}
                                    type={notificationLink.type}
                                    content={
                                        <>
                                            {/* {Icon && <Icon fontSize="large" />} */}
                                            {notificationLink.iconImage && (
                                                <img
                                                    src={
                                                        notificationLink.iconImage
                                                    }
                                                    alt="#"
                                                    aria-hidden={true}
                                                    title={
                                                        notificationLink.title
                                                    }
                                                />
                                            )}
                                            <span className="topbar-center-panel-notifications-badge">
                                                {
                                                    notificationLink.messageCounter
                                                }
                                            </span>
                                        </>
                                    }
                                    href={notificationLink.path}
                                    hover="left-line"
                                />
                            );
                        }
                    )}
                </div>
            </div>
            <div className="topbar-right-panel">
                <div className="topbar-links-wrapper">
                    {topBarRightLinksConfig.map(
                        (link, index) =>
                            !isAuthorized && (
                                <CustomLink
                                    key={index}
                                    type={link.type}
                                    content={<>{link.text}</>}
                                    href={link.path}
                                    hover="underline"
                                />
                            )
                    )}
                    {isAuthorized && (
                        <ButtonSmall
                            iconSrc={exitIcon}
                            onClick={() => setIsAuthorized(false)}
                        />
                    )}
                </div>

                <CustomLink
                    type="internal"
                    content={<BigHead className="topbar-profile-image" />}
                    href="/profile"
                    hover="left-line"
                />
            </div>
        </header>
    );
};
