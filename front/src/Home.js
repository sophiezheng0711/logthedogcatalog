import React from 'react';
import './App.css';
import { Button, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import items from './items';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Loader from './Loader';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.update = this.update.bind(this);
        this.state = {
            name: null,
            result: [],
            loading: false
        };
      }

      search() {
        const n = this.state.name;
        this.setState({ loading: true }, () => {
        // axios.get('http://localhost:5000/api/search?name=' + n)
        axios.get('/api/search?name=' + n)
            .then((response) => {
            this.setState(() => {
                return {
                    name: "",
                    result: [],
                    loading: false,
                }
            });
            if (response.data.length === 0) {
              window.location.replace(window.location.origin + "/#/notfound");
            }
            else {
              window.location.replace(window.location.origin + "/#/search?" + JSON.stringify({dog: n, data: response.data}));
            }
            })
            .catch(function (error) {
                console.log(error);
            });
        })
    }



      update = (event,value) => {
        this.setState({
            name: value
        });
        console.log(this.state.name);
      };
      render() {

        if(this.state.loading){
            return <Loader />
        }

        return (
            <>
              <header className="App-header">
              <Container>
                <Row className="justify-content-md-center">
                <p style={{color:'#1B4F72', fontFamily: 'Comic Sans MS', fontSize:'60px', backgroundColor: 'transparent', fontWeight:'bold'}}>&nbsp; Logtheanalogdog &nbsp;</p>
                </Row>
                <Row className="justify-content-md-center">
                  <Autocomplete
                    id="combo-box-demo"
                    options={items}
                    getOptionLabel={(option) => option.label}
                    style={{ width: 600 }}
                    renderInput={(params) => <TextField {...params} label="Doggo" variant="standard" />}
                    onInputChange={this.update}
                  />
                  &nbsp; &nbsp; &nbsp; &nbsp;
                  <Button onClick={this.search} style={{backgroundColor: '#AED6F1', color:'#3498DB', fontFamily: 'Comic Sans MS', fontWeight:'bold'}}>Search</Button>
                </Row>
                </Container>
              </header>
            </>
        );
      }
}

export default App;
