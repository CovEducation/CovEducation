import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import Accordion, { AccordionRow } from './components/Accordion';
import Text from './components/TextBox';
import DropDown from './components/Dropdown';
import Modal from './components/Modal';
import VTabs from './components/Tabs';
import Wizard from './components/Wizard';
import { AuthProvider } from './providers/AuthProvider'
import { SignIn } from './components/SignIn';

const Wiz_content = ['page1', <Button>oh boi</Button>, 'page3']
const items = [
    {
        id: 1,
        value: 'Elementary'
    },
    {
        id: 2,
        value: 'Middle'
    },
    {
        id: 3,
        value: 'High'
    }
]

function App() {
    const [apiStatus, setApiStatus] = useState(null);
    const [text, setText] = React.useState('');
    const handleChange = (event) => {
        setText(event.target.value);
    };

    useEffect(() => {
    fetch('/heartbeat')
      .then((res) => res.text())
      .then((data) => setApiStatus(data))
      .catch((err) => console.log(err));
    }, []);

    return (
        <AuthProvider>
        <div className="App">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
              Learn React
            </a>
            <br />
            {apiStatus}
            <br/><br/>
            <SignIn />
            <Button theme="default" size="md" onClick={() => alert('hello')}>
              Click me
            </Button>
            {/*The Text now floats, has a placeholder, and its value can be stored */}
            <Text label="Input Text" type="standard" placeholder="Text Here" value={text} onChange={handleChange}/>
            <Text label="Mirrored Text" type="standard" placeholder="Text Here" value={text} onChange={handleChange}/>
            <Text label="Not Mirrored Text" type="standard-uncontrolled" placeholder="Text Here" />
            <br/>
            <DropDown title="Select Grade Level" items={items}/>
            <DropDown title="Select Grade Level (Multiselect)" items={items} multiSelect={true}/>
            <VTabs texts={['oh', 'my', 'god']} values={[0]} labels={['Uno', 'Dos', 'Tres']}/>
            <br/>
            <Modal title="test title" trigger={<Button> Wow. A Modal </Button>}> <Wizard content={Wiz_content} /> </Modal>
            <Accordion>
              <AccordionRow title="Hidden content click me"><h1>Hello</h1><Button>button</Button></AccordionRow>
            </Accordion>
        </div>
        </AuthProvider>
    );
}

export default App;
