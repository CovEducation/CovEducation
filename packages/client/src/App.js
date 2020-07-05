import React, { Suspense } from 'react';
import { Router, Link } from '@reach/router';
import './App.css';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';

function App() {
  return (
    <Suspense fallback="loading">
      {/* Add Navbar component on this line */}
      <Router>
        <HomePage path="/" />
        <ProfilePage path="/profile" />
      </Router>
    </Suspense>
  );
}

export default App;
