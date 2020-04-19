import React from 'react';
import {Jumbotron, Container} from "react-bootstrap";

class App extends React.Component {
    render() {
        return (
            <Jumbotron fluid {...this.props}>
                <Container>
                <h1 style={{fontFamily: 'Anders', marginBottom: '1em'}}>{this.props.title}</h1>
                <p>
                {this.props.text}
                </p>
                </Container>
            </Jumbotron>
        );
    }
}

export default App;