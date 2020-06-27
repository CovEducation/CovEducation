import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import TextFields from './components/TextBox';
import VTabs from './components/Tabs';

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
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <br/><br/>
        <Button theme="default" size="md" onClick={() => alert('hello')}>
          Click me
        </Button>
        <TextFields label="type here or die" type="standard-basic"/>
        <br/>
        <VTabs values={[1, 2, 3, 4]}texts={['One, ', 'Two, ', 'Three... ', 'Counting is FUN!']}/>
        <br/>
        {apiStatus}
    </div>
  );
}

export default App;
