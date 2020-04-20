import React from 'react';
import './App.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import items from './items';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Switch } from 'antd';
import "antd/dist/antd.css";
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';


const PrettoSlider = withStyles({
  root: {
    color: 'black',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

class App extends React.Component {

    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.update = this.update.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.changeBreed = this.changeBreed.bind(this);
        this.changeHeight = this.changeHeight.bind(this);
        this.changeWeight = this.changeWeight.bind(this);
        this.changePop = this.changePop.bind(this);
        this.state = {
            name: null,
            advanceSwitch: false,
            toggleBackColor: 'black',
            toggleTextColor: 'black',
            breed: 10,
            height: 5,
            weight: 5,
            pop: 3
        };
        
      }

      search() {
        const n = this.state.name+'&breed='+this.state.breed+'&height='+this.state.height+'&weight='+this.state.weight+'&pop='+this.state.pop;
        window.location.replace(window.location.origin + "/#/search?name=" + encodeURI(n));
      }

      onToggle(checked) {
        if (checked) {
          this.setState({advanceSwitch:checked, toggleBackColor: 'aqua', toggleTextColor: 'aqua'});
        }
        else {
          this.setState({advanceSwitch:checked, toggleBackColor: 'black', toggleTextColor: 'black'});
        }
      }

      update = (_,value) => {
        this.setState({
            name: value
        });
      };

      changeBreed(_,value) {
        console.log(value);
        this.setState({breed: value});
      }

      changeHeight(_,value) {
        this.setState({height: value});
      }

      changeWeight(_,value) {
        this.setState({weight: value});
      }

      changePop(_,value) {
        this.setState({pop: value});
      }

      render() {
        const classes = this.props;
        return (
            <>
              <header className="App-header">
              <Container>
                <Row className="justify-content-md-center">
                <p style={{color:'black', fontFamily: 'Anders', fontSize:'70px', backgroundColor: 'rgba(204, 204, 204, 0.2)'}}>&nbsp; Log the Analog Dog &nbsp;</p>
                </Row>
                <Row className="justify-content-md-center" style={{marginBottom: '2em'}}>
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
                <Row className="justify-content-md-center">
                  <div style={{backgroundColor: 'rgba(50, 50, 50, 0.3)', border: '2px solid black', borderRadius: '3px', display: 'flex', flexDirection: 'row'}}>
                <Col>
                <Switch style={{backgroundColor: this.state.toggleBackColor}} 
                defaultChecked={this.state.advanceSwitch} onChange={this.onToggle}/>
                </Col>
                <Col className="justify-content-md-center" style={{color: this.state.toggleTextColor, fontFamily: 'Anders', fontWeight: 'bold', fontSize: '25px'}}>
                Advanced
                </Col>
                </div>
                </Row>
                {this.state.advanceSwitch &&
                  <Row className="justify-content-md-center">
                    <Container style={{marginTop: '3em'}}>
                      <Row>
                          <Col className={classes.root}>
                              <Row>
                                  <Col sm={3}>
                                      <div style={{color: 'black', fontFamily: 'Anders', fontWeight: 'bold'}}>Breed</div>
                                  </Col>
                                  <Col>
                                      <PrettoSlider defaultValue={this.state.breed} onChangeCommitted={this.changeBreed} step={1} min={0} max={10} valueLabelDisplay="auto" aria-label="1" />
                                  </Col>
                              </Row>
                          </Col>
                          <Col className={classes.root} sm={{offset:1}}>
                              <Row>
                                  <Col sm={3}>
                                      <div style={{color: 'black', fontFamily: 'Anders', fontWeight: 'bold'}}>Height</div>
                                  </Col>
                                  <Col>
                                      <PrettoSlider defaultValue={this.state.height} onChangeCommitted={this.changeHeight} step={1} min={0} max={10} valueLabelDisplay="auto" aria-label="1" />
                                  </Col>
                              </Row>
                          </Col>
                      </Row>
                      <Row>
                          <Col className={classes.root}>
                              <Row>
                                  <Col sm={3}>
                                      <div style={{color: 'black', fontFamily: 'Anders', fontWeight: 'bold'}}>Weight</div>
                                  </Col>
                                  <Col>
                                      <PrettoSlider defaultValue={this.state.weight} onChangeCommitted={this.changeWeight} step={1} min={0} max={10} valueLabelDisplay="auto" aria-label="1" />
                                  </Col>
                              </Row>
                          </Col>
                          <Col className={classes.root} sm={{offset:1}}>
                              <Row>
                                  <Col sm={3}>
                                      <div style={{color: 'black', fontFamily: 'Anders', fontWeight: 'bold'}}>Popularity</div>
                                  </Col>
                                  <Col sm={{span:7, offset: 2}}>
                                      <PrettoSlider defaultValue={this.state.pop} onChangeCommitted={this.changePop} step={1} min={0} max={10} valueLabelDisplay="auto" aria-label="1" />
                                  </Col>
                              </Row>
                          </Col>
                      </Row>
                  </Container>
                  </Row>
                }
                </Container>
              </header>
            </>
        );
      }
}

export default App;
