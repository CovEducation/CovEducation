import React, { Suspense } from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import './App.css';
import DashboardPage from './pages/Dashboard';
import HomePage from './pages/Home';
import FAQsPage from './pages/FAQs';
import ProfilePage from './pages/Profile';
import SignUpPage from './pages/SignUp';
import MeetOurTeam from './pages/MeetOurTeam';
import NavBar from './components/NavBar';
import ForMentors from './pages/HowItWorks/ForMentors';
import ForParents from './pages/HowItWorks/ForParents';
import ContactUsPage from './pages/ContactUs';
import SignInPage from './pages/SignIn';

import { AuthProvider } from './providers/AuthProvider';

function App() {
  return (
    <Suspense fallback={<></>}>
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
              <Route path="/contactus">
                <ContactUsPage />
              </Route>
              <Route path="/faqs">
                <FAQsPage />
              </Route>
              <Route path="/dashboard">
                <DashboardPage />
              </Route>
              <Route path="/signup">
                <SignUpPage />
              </Route>
              <Route path="/team">
                <MeetOurTeam/>
              </Route>
              <Route path="/signin">
                <SignInPage/>
              </Route>
              <Route path="/forgot-password">
                <br/>
              </Route>
            </Switch>
          </Router>
        </AuthProvider>
    </Suspense>
  );
}

export default App;
