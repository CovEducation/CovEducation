import React from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import FAQsPage from './pages/FAQs';
import ProfilePage from './pages/Profile';
import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import Signin from './components/SignIn';
import NavBar from './components/NavBar';
import ForMentors from './pages/HowItWorks/ForMentors';
import ForParents from './pages/HowItWorks/ForParents';

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
          <Route path="/parents">
             <ForParents />
           </Route>
           <Route path="/mentors">
             <ForMentors />
           </Route>
          <Route path="/faqs">
            <FAQsPage />
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
