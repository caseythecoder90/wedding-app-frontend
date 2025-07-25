import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import OurStory from './pages/OurStory';
import Venue from './pages/Venue';
import RSVP from './pages/RSVP';
import NotFound from './pages/NotFound';
import Registry from './pages/Registry';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="our-story" element={<OurStory />} />
            <Route path="venue" element={<Venue />} />
            <Route path="rsvp" element={<RSVP />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/registry" element={<Registry />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;