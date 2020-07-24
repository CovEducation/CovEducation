import React, { } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';
import DashboardPage from './pages/Dashboard';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import SignInPage from './pages/SignIn';
import { AuthProvider } from './providers/AuthProvider';

function App() {
  return (
    <AuthProvider fallback="loading">
      {/* Add Navbar component on this line */}
      <Router>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/dashboard">
            <DashboardPage />
          </Route>
          <Route path="/signin">
            <SignInPage/>
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
