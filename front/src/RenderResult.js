import React from 'react';
import {Card, Button} from "react-bootstrap";
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
                size: 0.5

              },
              meta: { color: 'aqua' }
            }
          ];

      const captions = {
            // columns
            energy: 'Energy Match',
            utility: 'Utility Match',
            breed: 'Breed Match',
            sociability: 'Sociability Match',
            size: 'Size Match'
          };
        return (
            <Card style={{ width: '18rem', flex: '1', size: 'cover', color:'#1B4F72', fontFamily: 'Comic Sans MS'}}>
                <Card.Img variant="top" src={require('./dogpics/' + this.props.name + '.jpg')} height='180px' style={{objectFit: 'cover'}} />
                <Card.Body>
                    <Card.Title>{this.props.rank + ". " + this.formatName(this.props.name)}</Card.Title>
                    <RadarChart captions={captions} data={data} size={200}/>
                    <Button variant="info">Learn More</Button>
                </Card.Body>
            </Card>
        );
    }
}

export default App;
