import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import VTabs from './components/Tabs';
import SignIn from './components/TextBox/Signin';
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
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button theme="default" size="md" onClick={() => alert('hello')}>
          Click me
        </Button>
        <Button theme="accent" basic onClick={() => alert('hello')}>
          Click me
        </Button>

        <Button size="sm" onClick={() => alert('hello')}>
          Click me
        </Button>

        <VTabs values={[1, 2, 3, 4]} texts={['1', '2', '3', 'Counting is cool.']}/>
        <br/>
        <SignIn />
        <br/>
        <SignUp isMentor={true} />
        <br/>
        <SignUp isMentor={false} />
        <br/>
        {apiStatus}
    </div>
  );
}

export default App;
