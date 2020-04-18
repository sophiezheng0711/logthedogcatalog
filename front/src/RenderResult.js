import React from 'react';
import {Card, Button} from "react-bootstrap";
import img from "./dummy.png";

class App extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={img} height='180px' />
                <Card.Body>
                    <Card.Title>{this.props.rank + ". " + this.props.name}</Card.Title>
                    <Card.Text>
                    {"// TODO replace " + this.props.similarity}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        );
    }
}

export default App;