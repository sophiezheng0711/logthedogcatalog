import React from 'react';
import './App.css';
import { Button, Container, Row } from 'react-bootstrap';
import items from './items';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.update = this.update.bind(this);
        this.state = {
            name: null
        };
      }

      search() {
        const n = this.state.name;
        window.location.replace(window.location.origin + "/#/search?" + encodeURI(n));
      }



      update = (event,value) => {
        this.setState({
            name: value
        });
      };
      render() {
        return (
            <>
              <header className="App-header">
              <Container>
                <Row className="justify-content-md-center">
                <p style={{color:'black', fontFamily: 'Anders', fontSize:'80px', backgroundColor: 'rgba(204, 204, 204, 0.2)'}}>&nbsp; Log the Analog Dog &nbsp;</p>
                </Row>
                <Row className="justify-content-md-center">
                  <Autocomplete
                    id="combo-box-demo"
                    options={items}
                    getOptionLabel={(option) => option.label}
                    style={{ width: 600 }}
                    renderInput={(params) => <TextField {...params} label="Doggo" variant="filled" />}
                    onInputChange={this.update}
                    onKeyUp={(event) => {
                      if (event.key === 'Enter')
                          this.search()
                  }}
                  />
                  &nbsp; &nbsp; &nbsp; &nbsp;
                  <Button onClick={this.search} style={{fontFamily: 'Loki', fontWeight:'bold', backgroundColor:'rgba(50, 50, 50, 0.3)', 
                  border: '2px solid black', borderRadius: '3px', color: 'black'}}>Search</Button>
                </Row>
                </Container>
              </header>
            </>
        );
      }
}

export default App;
