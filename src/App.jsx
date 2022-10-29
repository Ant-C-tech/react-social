import './app.css';

import { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { TopBar } from '@sections/Topbar';
import { NavBar } from '@sections/Navbar';
import { News } from '@pages/news/News';
import { FavoriteNews } from '@pages/favoriteNews/FavoriteNews';
import { ToDo } from '@pages/todo/ToDo';
import { Notes } from '@pages/notes/Notes';
import { Events } from '@pages/events/Events';
import { Translation } from '@pages/translation/Translation';
import { Photos } from '@pages/photos/Photos';
import { Videos } from '@pages/videos/Videos';
import { Music } from '@pages/music/Music';
import { Jobs } from '@pages/jobs/Jobs';
import { Books } from '@pages/books/Books';
import { Chats } from '@pages/chats/Chats';
import { Settings } from '@pages/settings/Settings';
import { Help } from '@pages/help/Help';
import { SignUp } from '@pages/signup/SignUp';
import { LogIn } from '@pages/login/LogIn';
import { NoMatch } from '@pages/nomatch/NoMatch';
import { Contact } from '@pages/contact/Contact';

const App = () => {
  // Mock authorization data
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Mock data for contacts list
  const rug = require('random-username-generator');
  rug.setSeperator(' ');

  const getRandomNameToUpper = () => {
    const randomName = rug.generate();
    return randomName
      .split(' ')
      .map((word) => {
        return `${word[0].toUpperCase()}${word.slice(1)}`;
      })
      .join(' ');
  };

  const contactsCounter = 7;
  const contacts = [];
  for (let index = 0; index < contactsCounter; index++) {
    contacts.push(getRandomNameToUpper());
  }
  // End of Mock data for contacts list

  return (
    <Router>
      <TopBar isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />
      <main className='container-flex'>
        <NavBar contacts={contacts} />
        <Routes>
          <Route exact path='organizer/' element={<News />} />
          <Route path='organizer/favorite_news' element={<FavoriteNews />} />
          <Route path='organizer/todo' element={<ToDo />} />
          <Route path='organizer/notes' element={<Notes />} />
          <Route path='organizer/events' element={<Events />} />
          <Route path='organizer/translation' element={<Translation />} />
          <Route path='organizer/photos' element={<Photos />} />
          <Route path='organizer/videos' element={<Videos />} />
          <Route path='organizer/music' element={<Music />} />
          <Route path='organizer/jobs' element={<Jobs />} />
          <Route path='organizer/books' element={<Books />} />
          <Route path='organizer/chats' element={<Chats />} />
          {contacts.map((_contact, index) => (
            <Route
              key={index}
              path={`organizer/contact/${index}`}
              element={<Contact />}
            />
          ))}

          <Route path='organizer/settings' element={<Settings />} />
          <Route path='organizer/help' element={<Help />} />

          {!isAuthorized && (
            <Route path='organizer/signup' element={<SignUp />} />
          )}
          {!isAuthorized && (
            <Route path='organizer/login' element={<LogIn />} />
          )}

          <Route path='*' element={<NoMatch />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
