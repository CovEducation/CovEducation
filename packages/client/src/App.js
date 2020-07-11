import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';

function App() {
  return (
    <Suspense fallback="loading">
      {/* Add Navbar component on this line */}
      <Router>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route>
            <ProfilePage path="/profile" />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
