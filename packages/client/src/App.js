import React from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import FAQsPage from './pages/FAQs';
import ProfilePage from './pages/Profile';
<<<<<<< HEAD
import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import Signin from './components/SignIn';
import NavBar from './components/NavBar';
=======
import FAQsPage from './pages/FAQs';
>>>>>>> 748fd922de3a597703758845f35e18af1644b0bb
import { AuthProvider } from './providers/AuthProvider';

function App() {
  return (
    <AuthProvider fallback="loading">
      <Router>
      <NavBar />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/faqs">
            <FAQsPage />
          </Route>
<<<<<<< HEAD
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
=======
>>>>>>> 748fd922de3a597703758845f35e18af1644b0bb
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
