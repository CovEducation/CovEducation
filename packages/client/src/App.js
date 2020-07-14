import React, { } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import SignInPage from './pages/SignIn';
import { AuthProvider } from './providers/AuthProvider';
import FindAMentorPage from './pages/FindAMentor';

function App() {
  return (
    <AuthProvider fallback="loading">
      {/* Add Navbar component on this line */}
      <Router>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/find-a-mentor">
            <FindAMentorPage /> />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/signin"><SignInPage/></Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
