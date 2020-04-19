import React from 'react';
import {CardColumns, Container} from "react-bootstrap";
import RenderResult from "./RenderResult";

class App extends React.Component {

    render() {
        const q = window.location.hash;
        const rstList = JSON.parse(decodeURI(q.substring(9, q.length)));
        // console.log(rstList.data);
        return (
            <>

            <Container>
                <p style={{color:'#1B4F72', fontFamily: 'Anders', fontSize:'60px', backgroundColor: 'rgba(204, 204, 204, 0.5)'}}>&nbsp; {rstList.dog.toUpperCase()} &nbsp;</p>
                {/* <Textbox title={rstList.dog.toUpperCase()} style={{color:'#1B4F72', fontFamily: 'Anders'}}/> */}
                <CardColumns fluid="xs">
                {rstList.data.map((value, index) => (
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
