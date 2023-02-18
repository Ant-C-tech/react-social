import "./app.css";

import { React, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { TopBar, NavBar } from "@sections";
import { Message } from "@common";

import {
    News,
    FavoriteNews,
    ToDo,
    Notes,
    Events,
    Translation,
    Photos,
    Videos,
    Music,
    Jobs,
    Books,
    Chats,
    Settings,
    Help,
    SignUp,
    LogIn,
    NoMatch,
    Contacts,
} from "@pages";

const App = () => {
    // Mock authorization data
    const [isAuthorized, setIsAuthorized] = useState(false);

    // Mock data for contacts list

    // eslint-disable-next-line no-undef
    const rug = require("random-username-generator");
    rug.setSeperator(" ");

    const getRandomNameToUpper = () => {
        const randomName = rug.generate();
        return randomName
            .split(" ")
            .map((word) => {
                return `${word[0].toUpperCase()}${word.slice(1)}`;
            })
            .join(" ");
    };

    const contactsCounter = 7;
    const contacts = [];
    for (let index = 0; index < contactsCounter; index++) {
        contacts.push(getRandomNameToUpper());
    }
    // End of Mock data for contacts list

    const mediaMatch = window.matchMedia("(max-width: 720px)");

    return mediaMatch.matches ? (
        <Message
            type={"message-info"}
            title={"There is no mobile version of the application yet"}
        >
            <p>We are really sorry about your unpleasant experience:(</p>
        </Message>
    ) : (
        <Router>
            <TopBar
                isAuthorized={isAuthorized}
                setIsAuthorized={setIsAuthorized}
            />
            <main className="container-flex">
                <NavBar contacts={contacts} />
                <Routes>
                    <Route exact path="organizer/" element={<News />} />
                    <Route
                        path="organizer/favorite_news"
                        element={<FavoriteNews />}
                    />
                    <Route path="organizer/todo" element={<ToDo />} />
                    <Route path="organizer/notes" element={<Notes />} />
                    <Route path="organizer/events" element={<Events />} />
                    <Route
                        path="organizer/translation"
                        element={<Translation />}
                    />
                    <Route path="organizer/photos" element={<Photos />} />
                    <Route path="organizer/videos" element={<Videos />} />
                    <Route path="organizer/music" element={<Music />} />
                    <Route path="organizer/jobs" element={<Jobs />} />
                    <Route path="organizer/books" element={<Books />} />
                    <Route path="organizer/chats" element={<Chats />} />
                    {contacts.map((_contact, index) => (
                        <Route
                            key={index}
                            path={`organizer/contact/${index}`}
                            element={<Contacts />}
                        />
                    ))}

                    <Route path="organizer/settings" element={<Settings />} />
                    <Route path="organizer/help" element={<Help />} />

                    {!isAuthorized && (
                        <Route path="organizer/signup" element={<SignUp />} />
                    )}
                    {!isAuthorized && (
                        <Route path="organizer/login" element={<LogIn />} />
                    )}

                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
