import React from 'react';
import {Card, Button, Container, Row, Col} from "react-bootstrap";
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css';
import AboutWindow from './AboutWindow';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.formatName = this.formatName.bind(this);
        this.state = {
          aboutShow: false
        };
        this.openAbout = this.openAbout.bind(this);
        this.closeAbout = this.closeAbout.bind(this);
        this.linkSearch = this.linkSearch.bind(this);
    }

    formatName(name) {
        const a = name.split("-");
        var i;
        var ans = "";
        for (i = 0; i < a.length; i++) {
            const first = a[i].charAt(0).toUpperCase();
            const last = a[i].charAt(a[i].length-1);
            // console.log(a[i]);
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
      window.location.replace(window.location.origin + "/#/search?" + encodeURI(this.props.name));
      window.location.reload(true)
    }

    render() {
        const data = [
            {
              data: {
                energy: this.props.similarity,
                utility: 0.5,
                breed: 0.5,
                sociability: 0.5,
                height: this.props.height,
                weight: this.props.weight,
                popularity: this.props.popularity,
              },
              meta: { color: 'aqua' }
            }
          ];

      const captions = {
            // columns
            energy: 'Energy',
            utility: 'Utility',
            breed: 'Breed',
            sociability: 'Sociability',
            height: 'Height',
            weight: 'Weight',
            popularity: 'Popularity'
          };
        return (
            <>
            <AboutWindow show={this.state.aboutShow} close={this.closeAbout} body={this.props.about} title={this.formatName(this.props.name)} name={this.props.name} />
            <Card border='dark' style={{ boxShadow:'3px 3px 3px 3px rgba(50,50,50,0.24)', width: '20rem', flex: '1', size: 'cover', color:'#1B4F72', fontFamily: 'Loki', marginBottom: '2em'}}>
                <Card.Header> </Card.Header>
                <Card.Img variant="top" src={require('./dogpics/' + this.props.name + '.jpg')} height='300px' style={{objectFit: 'cover'}} />
                <Card.Body>
                <Card.Title>{this.props.rank + ". " + this.formatName(this.props.name)}</Card.Title>
                  <Container>
                    <Row className="justify-content-md-center">
                      <RadarChart captions={captions} data={data} size={250}/>
                    </Row>
                    <Row>
                      <Col sm={0}>
                        <Button onClick={this.openAbout} style={{fontFamily: 'Loki', fontWeight:'bold', backgroundColor:'rgba(50, 50, 50, 0.3)', 
                        border: '2px solid black', borderRadius: '3px', color: 'black', marginTop: '1em', marginBottom: '2em'}}>Learn More</Button>
                      </Col>
                      <Col sm={2}>
                        <Button onClick={this.linkSearch} style={{fontFamily: 'Loki', fontWeight:'bold', backgroundColor:'rgba(50, 50, 50, 0.3)', 
                        border: '2px solid black', borderRadius: '3px', color: 'black', marginTop: '1em', marginBottom: '2em'}}>Search Me</Button>
                      </Col>
                    </Row>
                  </Container>
                </Card.Body>
            </Card>
            </>
        );
    }
}

export default App;
