import "./styles.css";
import {
    newsIcon,
    addToFavoriteButtonIcon,
    jobsIcon,
    musicIcon,
    booksIcon,
    todoIcon,
    noteIcon,
    eventsIcon,
    translationIcon,
    chatsIcon,
    photosIcon,
    videosIcon,
    contactsButtonIcon,
} from "@assets";

import React from "react";
import { useState } from "react";

import { BigHead } from "@bigheads/core";

import { CustomLink, Button } from "@common";

const navBarItemsConfig = [
    {
        type: "internal",
        iconImage: newsIcon,
        path: "organizer/",
        text: "News",
    },
    {
        type: "internal",
        iconImage: addToFavoriteButtonIcon,
        path: "organizer/favorite_news",
        text: "My Favorite News",
    },
    {
        type: "internal",
        iconImage: todoIcon,
        path: "organizer/todo",
        text: "ToDo",
    },
    {
        type: "internal",
        iconImage: noteIcon,
        path: "organizer/notes",
        text: "Notes",
    },
    {
        type: "internal",
        iconImage: eventsIcon,
        path: "organizer/events",
        text: "Events",
    },
    {
        type: "internal",
        iconImage: translationIcon,
        path: "organizer/translation",
        text: "Translation",
    },
    {
        type: "internal",
        iconImage: photosIcon,
        path: "organizer/photos",
        text: "Photos",
    },
    {
        type: "internal",
        iconImage: videosIcon,
        path: "organizer/videos",
        text: "Videos",
    },
    {
        type: "internal",
        iconImage: musicIcon,
        path: "organizer/music",
        text: "Music",
    },
    {
        type: "internal",
        iconImage: jobsIcon,
        path: "organizer/jobs",
        text: " Jobs",
    },
    {
        type: "internal",
        iconImage: booksIcon,
        path: "organizer/books",
        text: " Books",
    },
    {
        type: "internal",
        iconImage: chatsIcon,
        path: "organizer/chats",
        text: " Chats",
    },
];

export const NavBar = ({ contacts }) => {
    const [isContactsShown, setIsContactsShown] = useState(false);

    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                {navBarItemsConfig.map((navItem, index) => {
                    // const Icon = navItem['icon'];
                    return (
                        <li key={index} className="navbar-nav-item">
                            <CustomLink
                                type={navItem.type}
                                content={
                                    <>
                                        {/* {Icon && <Icon fontSize='large' />} */}
                                        {navItem.iconImage && (
                                            <img
                                                src={navItem.iconImage}
                                                alt="#"
                                                aria-hidden={true}
                                            />
                                        )}
                                        <span className="navbar-link-add-text">
                                            {navItem.text}
                                        </span>
                                    </>
                                }
                                href={navItem.path}
                                hover="left-line"
                            />
                        </li>
                    );
                })}
            </ul>
            <hr className="navbar-divider" />
            <Button
                text={isContactsShown ? "Hide Contacts" : "Show Contacts"}
                buttonIconSrc={contactsButtonIcon}
                active={false}
                onClick={() => setIsContactsShown((prevState) => !prevState)}
            />
            {isContactsShown && (
                <ul className="navbar-contacts">
                    {contacts.map((contact, index) => (
                        <li key={index} className="navbar-contact">
                            <CustomLink
                                type="internal"
                                content={
                                    <>
                                        <BigHead className="navbar-contact-image" />
                                        <span className="navbar-link-add-text">
                                            {contact}
                                        </span>
                                    </>
                                }
                                href={`organizer/contact/${index}`}
                                hover="left-line"
                                text={contact}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
};
