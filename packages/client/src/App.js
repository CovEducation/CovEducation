import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import Accordion, { AccordionRow } from './components/Accordion';

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
      <header className="App-header">
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
        <Accordion>
          <AccordionRow title="Some hidden content">
            <p>Hello!</p>
          </AccordionRow>
        </Accordion>
        {apiStatus}
      </header>
    </div>
  );
}

export default App;
