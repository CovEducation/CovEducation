import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "./components/Button";
import Modal from "./components/Modal";
import Wizard from "./components/Wizard"

const Wiz_content = [
  {
    key: 0,
    value: "page1"
  },
  {
    key: 1,
    value: "page2"
  },
  {
    key: 2,
    value: "AHHHH"
  }
]

function App() {
  var [apiStatus, setApiStatus] = useState(null);

  useEffect(() => {
    fetch("/heartbeat")
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
        <Button theme="default" size="md" onClick={() => alert("hello")}>
          Click me
        </Button>
        <Modal title="ahh" trigger={<Button> Modal Button </Button>}> <Wizard content={Wiz_content} /> </Modal>
        {apiStatus}
      </header>
    </div>
  );
}

export default App;
