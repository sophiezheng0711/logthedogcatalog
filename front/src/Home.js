import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Slider , Input} from 'antd';
import "antd/dist/antd.css";
import axios from 'axios';

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.update = this.update.bind(this);
        this.state = {
            name: null,
            result: [],
        };
      }
    
      search() {
        axios.get('/api/search', { name: this.state.name })
            .then((response) => {
            this.setState(() => {
                return {
                    name: null,
                    result: [],
                }
            });
            window.location.replace(window.location.origin + "/#/search?" + JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
      }

      update = (event) => {
        this.setState({name:event.target.value});
      }

      render() {
        return (
            <>
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Dog Recommender
                </p>
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
                  <Input placeholder={"input"} type={"text"} style={{}} onChange={this.update}></Input>
                  <Button type="primary" style={{ marginLeft: 8 }} onClick={this.search}>
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
            </>
        );
      }
}

export default App;