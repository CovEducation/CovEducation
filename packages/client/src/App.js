import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import TextFields from './components/TextBox';
import VTabs from './components/Tabs';
import SignUp from './components/TextBox/Signup';

function App() {
  var [apiStatus, setApiStatus] = useState(null);

  useEffect(() => {
    fetch('/heartbeat')
      .then((res) => res.text())
      .then((data) => setApiStatus(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          Edit <code>src/App.js</code> and save to reload.
        </h2>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <br/><br/>
        <Button theme="default" size="md" onClick={() => alert('hello')}>
          Click me
        </Button>
        <TextFields label="Sample Standard TextBox" type="standard-basic"/>
        <br/>
        <VTabs values={[1, 2, 3, 4]}texts={['Sample Tabs', 'One, Two, Three, Four, ', 'Five, Six, Seven, Eight, ', 'Nine, and Ten. Counting is FUN!']}/>
        <br/>
        <h1>Mentor Sign-up</h1>
        <SignUp isMentor={true}/>
        <br/>
        <h1>Parent Sign-up</h1>
        <SignUp isMentor={false}/>
        <br/>
        {apiStatus}
    </div>
  );
}

export default App;
