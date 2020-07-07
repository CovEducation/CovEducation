import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import VTabs from './components/Tabs';

function App() {
    const [apiStatus, setApiStatus] = useState(null);

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
      {apiStatus}
      <br />
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
      <br />
      <VTabs texts={['1', '2', '3', 'counting is fun']} labels={['Uno', 'Dos', 'Tres', 'Oh boi']} class="dash"/>
      <VTabs texts={['1', '2', '3', 'counting is fun']} labels={['Uno', 'Dos', 'Tres', 'Oh boi']} class="process"/>
      <br />
    </div>
  );
}

export default App;
