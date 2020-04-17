import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button , Slider , Input} from 'antd';
import "antd/dist/antd.css";
import ConnectAPI from './ConnectAPI'


function App() {
  return (
    <div className="App" >
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Dog Recommender
        </p>
        <ConnectAPI />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Input your expectations
        </a>
        <div>
          <Slider min={0} max={100} step={1} defaultValue={30} disabled={false}></Slider>
          <Input placeholder={"input"} type={"text"} style={{}}></Input>
          <Button type="primary" style={{ marginLeft: 8 }}>
            Search
          </Button>
        </div>
      </header>
      <div className="MarkdownEditor">
        <h3>Input</h3>
        <label htmlFor="markdown-content">
          Enter words
        </label>
        <textarea
          id="markdown-content"
        />
        <h3>Output</h3>
        <div
          className="content"
        />
      </div>



    </div>


  );
}


export default App;
