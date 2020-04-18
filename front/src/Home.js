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
        const n = this.state.name;
        axios.get('/api/search?name=' + n)
            .then((response) => {
            this.setState(() => {
                return {
                    name: null,
                    result: [],
                }
            });
            window.location.replace(window.location.origin + "/#/search?" + JSON.stringify({dog: n, data: response.data}));
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
                <p style={{color:'black', fontFamily: '"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monospace', fontSize:'60px', backgroundColor: 'rgba(204, 204, 204, 0.5)', fontWeight:'bold'}}>&nbsp; Logtheanalogdog &nbsp;</p>
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
            </>
        );
      }
}

export default App;