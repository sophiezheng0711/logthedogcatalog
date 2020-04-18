import React from 'react';
import {CardColumns, Container} from "react-bootstrap";
import RenderResult from "./RenderResult";

class App extends React.Component {
    
    render() {
        const q = window.location.hash;
        const rstList = JSON.parse(decodeURI(q.substring(9, q.length)));
        return (
            <>
            <br></br>
            <Container fluid="xs">
                <CardColumns>
                {rstList.map((value, index) => (
                    <>
                        <RenderResult rank={index+1} name={value[0]} similarity={value[1]} />
                    </>
                ))}
                </CardColumns>
            </Container>
            </>
        );
    }
}

export default App;