import React from 'react';
import {Card, Button, Container, Row, Col, OverlayTrigger, Tooltip} from "react-bootstrap";
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css';
import AboutWindow from './AboutWindow';
import { Tag } from 'antd';
import "antd/dist/antd.css";
import axios from 'axios';
import HelpWindow from './HelpWindow';

var ids = require('./breeIds.json');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.formatName = this.formatName.bind(this);
        this.state = {
          aboutShow: false,
          alertShow: false,
        };
        this.openAbout = this.openAbout.bind(this);
        this.closeAbout = this.closeAbout.bind(this);
        this.linkSearch = this.linkSearch.bind(this);
        this.renderTooltip = this.renderTooltip.bind(this);
        this.geoAlertClose = this.geoAlertClose.bind(this);
        this.geoAlertShow = this.geoAlertShow.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.showPosition = this.showPosition.bind(this);
    }

    geoAlertShow() {
      this.setState({alertShow: true});
    }

    geoAlertClose() {
      this.setState({alertShow: false});
    }

    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition, this.geoAlertShow);
      }
    }
    
    showPosition(position) {
      this.props.loadingShow();
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + 
      "&key=AIzaSyBRBE-ANhsIYlVK2AtlKccEIyVZW4MecEE";
      axios.get(url)
        .then((response) => {
          var results = response.data.results;
          const temp = results[0].address_components;
          var zip = '';
          temp.forEach((value) => {if (value.types[0] === "postal_code") {
            zip = value.short_name;
          }});
          // window.open("https://www.adoptapet.com/pet-search?clan_id=1&family_id="+ids[this.props.name]+
          // "&geo_range=50&location="+zip+"&page=1");

          // console.log(zip);
          this.props.loadingHide();
          window.location.replace("https://www.adoptapet.com/pet-search?clan_id=1&family_id="+ids[this.props.name]+
          "&geo_range=50&location="+zip+"&page=1");
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    formatName(name) {
        const a = name.split("-");
        var i;
        var ans = "";
        for (i = 0; i < a.length; i++) {
            const first = a[i].charAt(0).toUpperCase();
            const last = a[i].charAt(a[i].length-1);
            ans += (first + a[i].substring(1, a[i].length-1) + last) + " ";
        }
        return ans;
    }

    openAbout() {
      this.setState({aboutShow: true});
    }

    closeAbout() {
      this.setState({aboutShow: false});
    }

    linkSearch() {
      window.location.replace(window.location.origin + "/#/search?" + 
      encodeURI("name=" + this.props.name+'&breed='+this.props.cbreed+'&height='+this.props.cheight+'&weight='+this.props.cweight
      +'&pop='+this.props.cpop+'&personality='+this.props.cpers));
      window.location.reload(true)
    }

    renderTooltip(props) {
      return (
        <Tooltip id="button-tooltip" {...props}>
          Search with the same settings as before!
        </Tooltip>
      );
    }

    render() {
        // const tagColors = ["orange", "cyan", "lime", "gold", "geekblue", "magenta", "volcano", "purple"];
        const tagColors = ["black", "#6F4016", "#416366", "#414966"];
        if (this.props.tab2) {
          return(
            <>
            <HelpWindow show={this.state.alertShow} close={this.geoAlertClose} body={<>Please enable your location accessibility so that you can enjoy this feature!</>} />
            <AboutWindow show={this.state.aboutShow} close={this.closeAbout} body={this.props.about} title={this.formatName(this.props.name)} 
            name={this.props.name} shorts={this.props.shorts} />
            <Card border='dark' style={{ boxShadow:'3px 3px 3px 3px rgba(50,50,50,0.24)', width: '20rem', flex: '1', size: 'cover', color:'#1B4F72', fontFamily: 'Loki', marginBottom: '2em'}}>
                <Card.Img variant="top" src={require('./dogpics/' + this.props.name + '.jpg')} height='300px' style={{objectFit: 'cover'}} />
                <Card.Body>
                <Card.Title>{this.props.rank + ". " + this.formatName(this.props.name)}</Card.Title>
                  <Container>
                    <Row className="justify-content-md-center">
                      {this.props.traits.split(",").map((value)=> (
                        <Tag color={tagColors[Math.floor(Math.random() * tagColors.length)]} 
                        style={{fontWeight: 'bold', fontFamily: '"Lucida Console", Courier, monospace', marginTop: '0.5em', 
                        padding: '0.1em', fontSize: '14px'}}>&nbsp;{value.trim()}&nbsp;</Tag>
                      ))}
                    </Row>
                    <Row className="justify-content-md-center">
                      <Col sm={0}>
                        <Button onClick={this.openAbout} style={{fontFamily: 'Loki', fontWeight:'bold', backgroundColor:'rgba(50, 50, 50, 0.3)', 
                        border: '2px solid black', borderRadius: '3px', color: 'black', marginTop: '1em', marginBottom: '2em'}}>Learn More</Button>
                      </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                      <Button onClick={this.getLocation} style={{backgroundColor:'transparent', 
                      border: 'transparent'}}>
                      <img src={require('./adoptme_button.png')} alt="button2" /></Button>
                    </Row>
                  </Container>
                </Card.Body>
            </Card>
            </>
          );}
        const data = [
            {
              data: {
                breed: this.props.similarity,
                personality: this.props.personality,
                height: this.props.height,
                weight: this.props.weight,
                popularity: this.props.popularity,
              },
              meta: { color: '#16C3DE' }
            }
          ];

      const captions = {
            // columns
            breed: 'Breed',
            personality: 'Personality',
            height: 'Height',
            weight: 'Weight',
            popularity: 'Popularity'
          };
        return (
            <>
            <HelpWindow show={this.state.alertShow} close={this.geoAlertClose} body={<>Please enable your location accessibility so that you can enjoy this feature!</>} />
            <AboutWindow show={this.state.aboutShow} close={this.closeAbout} body={this.props.about} title={this.formatName(this.props.name)} name={this.props.name}  shorts={this.props.shorts} />
            <Card border='dark' style={{ boxShadow:'3px 3px 3px 3px rgba(50,50,50,0.24)', width: '20rem', flex: '1', size: 'cover', color:'#1B4F72', fontFamily: 'Loki', marginBottom: '2em'}}>
                <Card.Header> </Card.Header>
                <Card.Img variant="top" src={require('./dogpics/' + this.props.name + '.jpg')} height='300px' style={{objectFit: 'cover'}} />
                <Card.Body>
                <Card.Title>{this.props.rank + ". " + this.formatName(this.props.name)}</Card.Title>
                  <Container>
                    <Row className="justify-content-md-center">
                      <RadarChart captions={captions} data={data} size={300} />
                    </Row>
                    <Row>
                      <Col sm={0}>
                        <Button onClick={this.openAbout} style={{fontFamily: 'Loki', fontWeight:'bold', backgroundColor:'rgba(50, 50, 50, 0.3)', 
                        border: '2px solid black', borderRadius: '3px', color: 'black', marginTop: '1em'}}>Learn More</Button>
                      </Col>
                      <Col sm={2}>
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={this.renderTooltip}
                      >
                        <Button onClick={this.linkSearch} style={{fontFamily: 'Loki', fontWeight:'bold', backgroundColor:'rgba(50, 50, 50, 0.3)', 
                        border: '2px solid black', borderRadius: '3px', color: 'black', marginTop: '1em'}}>Search Me</Button>
                      </OverlayTrigger>
                        
                      </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                    <Button onClick={this.getLocation} style={{backgroundColor:'transparent', 
                      border: 'transparent'}}>
                      <img src={require('./adoptme_button.png')} alt="button" /></Button>
                    </Row>
                  </Container>
                </Card.Body>
            </Card>
            </>
        );
    }
}

export default App;
