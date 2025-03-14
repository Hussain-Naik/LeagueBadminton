import React from "react";
import logo from "./logo.svg";
import "./App.css";
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import Buttons from "./components/Buttons";



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Buttons label="button text" icon="pi pi-check"/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
