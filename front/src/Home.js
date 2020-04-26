import React from 'react';
import './App.css';
import { Button, Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import items from './items';
import adjs from './adjs';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Switch } from 'antd';
import "antd/dist/antd.css";
import AdvSliders from './AdvSliders'

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
        this.changePersonality = this.changePersonality.bind(this);
        this.personalitySearch = this.personalitySearch.bind(this);
        this.state = {
            name: null,
            advanceSwitch: false,
            toggleBackColor: 'black',
            toggleTextColor: 'black',
            breed: 10,
            height: 0,
            weight: 0,
            pop: 0,
            personality: 0,
            tab: 'regular',
            valDict: [],
        };
        
      }

      search() {
        const n = this.state.name+'&breed='+this.state.breed+'&height='+this.state.height+'&weight='
        +this.state.weight+'&pop='+this.state.pop+'&personality='+this.state.personality;
        window.location.replace(window.location.origin + "/#/search?" + encodeURI("ver=" + this.props.ver + "&name=" + n));
      }

      personalitySearch() {
        var temp = "";
        this.state.valDict.forEach((value) => {
          temp += value.label + ',';
        });
        const n = '&plist=' + temp.substring(0, temp.length-1);
        window.location.replace(window.location.origin + "/#/personality?" + encodeURI("ver=" + this.props.ver + n));
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

      changePersonality(_,value) {
        this.setState({personality: value});
      }

      render() {
        return (
            <>
              <header className="App-header">
              <Container>
                <Row className="justify-content-md-center">
                <p style={{color:'black', fontFamily: 'Anders', fontSize:'70px', backgroundColor: 'rgba(204, 204, 204, 0.2)'}}>&nbsp; Log&#183;the&#183;Dog&#183;Catalog &nbsp;</p>
                </Row>
                <Row className="justify-content-md-center" style={{marginTop: '-2.5em'}}>
                  <p style={{color:'#2F2F2F', fontFamily: 'Loki', fontSize: '20px', fontWeight: 'bold'}}>Your personalized dog breed recommender</p>
                </Row>
                <Tabs variant='pills' className='myClass' style={{backgroundColor:'rgba(50, 50, 50, 0.3)'}}
                activeKey={this.state.tab} onSelect={(k) => this.setState({tab: k})}>
                  <Tab eventKey="regular" title={<p style={{fontWeight: 'bold', color: 'white',
                  fontFamily: 'Loki', fontSize:'16px', marginTop: '0.4em', marginBottom: '-0.1em'}}>Breed Match</p>}>
                <Row className="justify-content-md-center" style={{marginBottom: '2em', marginTop: '2em'}}>
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
                <Col className="justify-content-md-center" style={{color: this.state.toggleTextColor, fontFamily: 'Anders', fontWeight: 'bold', fontSize: '25px', padding: '0.3em'}}>
                Advanced
                </Col>
                </div>
                </Row>
                <AdvSliders 
                  advanceSwitch={this.state.advanceSwitch}
                  breed={this.state.breed}
                  changeBreed={this.changeBreed}
                  height={this.state.height}
                  changeHeight={this.changeHeight}
                  weight={this.state.weight}
                  changeWeight={this.changeWeight}
                  pop={this.state.pop}
                  changePop={this.changePop}
                  personality={this.state.personality}
                  changePersonality={this.changePersonality}
                />
                </Tab>
                {this.props.ver === 2 &&
                
                <Tab eventKey="personality" title={<p style={{fontWeight: 'bold', color: 'white', 
                  fontFamily: 'Loki', fontSize:'16px', marginTop: '0.4em', marginBottom: '-0.1em'}}>Personality Match</p>}>
                    <Row className="justify-content-md-center" style={{marginBottom: '2em', marginTop: '2em'}}>
                    <Autocomplete
                      id="combo-box-demo"
                      multiple
                      options={adjs}
                      getOptionLabel={(option) => option.label}
                      style={{ width: 600 }}
                      onChange={(_, data) => {
                        this.setState({valDict: data});
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          name="multiple"
                          label="Describe your personality in a few words!"
                          variant="filled"
                          fullWidth
                        />
                      )}
                    />
                      &nbsp; &nbsp; &nbsp; &nbsp;
                      <Button onClick={this.personalitySearch} style={{fontFamily: 'Loki', fontWeight:'bold', backgroundColor:'rgba(50, 50, 50, 0.3)', 
                      border: '2px solid black', borderRadius: '3px', color: 'black', height: '3.5em'}}>Search</Button>
                    </Row>
                </Tab>
                }
                </Tabs>
                
                </Container>
              </header>
            </>
        );
      }
}

export default App;
