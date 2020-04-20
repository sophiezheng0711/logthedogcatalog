import React from 'react';
import {Card, Button, Container, Row} from "react-bootstrap";
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.formatName = this.formatName.bind(this)
    }

    formatName(name) {
        const a = name.split("-");
        var i;
        var ans = "";
        for (i = 0; i < a.length; i++) {
            const first = a[i].charAt(0).toUpperCase();
            const last = a[i].charAt(a[i].length-1);
            console.log(a[i]);
            ans += (first + a[i].substring(1, a[i].length-1) + last) + " ";
        }
        return ans;
    }

    render() {
        const data = [
            {
              data: {
                energy: this.props.similarity,
                utility: 0.5,
                breed: 0.5,
                sociability: 0.5,
                size: 0.5,
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
            size: 'Size',
            popularity: 'Popularity'
          };
        return (
            <Card border='dark' style={{ boxShadow:'3px 3px 3px 3px rgba(50,50,50,0.24)', width: '20rem', flex: '1', size: 'cover', color:'#1B4F72', fontFamily: 'Loki', marginBottom: '2em'}}>
                <Card.Header> </Card.Header>
                <Card.Img variant="top" src={require('./dogpics/' + this.props.name + '.jpg')} height='300px' style={{objectFit: 'cover'}} />
                <Card.Body>
                <Card.Title>{this.props.rank + ". " + this.formatName(this.props.name)}</Card.Title>
                  <Container>
                    <Row className="justify-content-md-center">
                      <RadarChart captions={captions} data={data} size={250}/>
                    </Row>
                    <Row className="justify-content-md-center">
                      <Button style={{fontFamily: 'Loki', fontWeight:'bold', backgroundColor:'rgba(50, 50, 50, 0.3)', 
                      border: '2px solid black', borderRadius: '3px', color: 'black', marginTop: '1em', marginBottom: '2em'}}>Learn More</Button>
                    </Row>
                  </Container>
                </Card.Body>
            </Card>
        );
    }
}

export default App;
