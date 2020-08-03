import React from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import Signin from './components/SignIn';
import NavBar from './components/NavBar';
import { AuthProvider } from './providers/AuthProvider';
import FindAMentorPage from './pages/FindAMentor';

function App() {
  return (
    <AuthProvider fallback="loading">
      <Router>
      <NavBar />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/find-a-mentor">
            <FindAMentorPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/signin">
            <SignInPage />
            {/* for testing and firebase stuffs :) */}
          </Route>
          <Route path="/forgot-password">
            <br/>
          </Route>
          <Route path="/sign-in" component={Signin} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
