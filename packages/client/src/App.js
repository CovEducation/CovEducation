import React from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
<<<<<<< HEAD
import SignUpPage from './pages/SignUp';
=======
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import Signin from './components/SignIn';
>>>>>>> master
import { AuthProvider } from './providers/AuthProvider';

function App() {
  return (
    <AuthProvider fallback="loading">
      {/* Add Navbar component here */}
      <Router>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
<<<<<<< HEAD
          <Route path="/signup">
            <SignUpPage />
          </Route>
=======
          <Route path="/signin">
            <SignInPage />
            {/* for testing and firebase stuffs :) */}
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/forgot-password">
            <br/>
          </Route>
          <Route path="/sign-in" component={Signin} />
>>>>>>> master
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
