import React from 'react';
import {Container} from "react-bootstrap";
import RenderResult from "./RenderResult";
import axios from 'axios';
import Loader from './Loader';
import { MDBRow } from "mdbreact";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.state = {
            // params: [], // params in the order of version, plist
            result: [],
            loading: true,
            chars: []
        };
      }

      search() {
        const q = window.location.hash;
        
        const n = q.substring(14, q.length);
        const temp = n.split("&")[1].split("=")[1].split(",");
        // setTimeout(function () {
            // axios.get('http://localhost:5000/api/personalityQuiz?' + n )
            axios.get('/api/personalityQuiz?' + n )
                .then((response) => {
                    console.log(response.data);
                if (response.data.length === 0) {
                window.location.replace(window.location.origin + "/#/notfound");
                }
                else {
                this.setState({loading: false, result:response.data, chars:temp});
                }
                })
                .catch(function (error) {
                    console.log(error);
                });
        // }.bind(this), 1500);
    }

    render() {
        if (this.state.loading) {
            this.search();
            return <Loader />;
        }
        const rstList = this.state.result;
        var jsons = [];
        rstList.map((value) => (
            jsons.push(value)
        ));
        const fin = jsons.slice(1, jsons.length);
        return (
            <>
            <Container>
                {/* <p style={{color:'black', fontFamily: 'Anders', fontSize:'60px', backgroundColor: 'rgba(204, 204, 204, 0.5)'}}>&nbsp; {jsons[0].name} &nbsp;</p>
                <Container style={{backgroundColor: 'rgba(204, 204, 204, 0.5)', marginBottom: '2em'}}>
                    <Row>
                        <Col>
                            <img src={require('./dogpics/' + jsons[0].name + '.jpg')} height='300px' style={{objectFit: 'cover'}} alt='' />
                        </Col>
                        <Col style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <p>{jsons[0].about}</p>
                        </Col>
                    </Row>
                </Container> */}
                <MDBRow style={{display: 'flex', flexWrap: 'wrap'}}>
                {fin.map((value, index) => (
                    <div style={{
                        lineHeight: '150px',
                        marginLeft: '2em',
                        flex: '1 0 auto',
                        overflow: 'auto'
                    }}>
                        <RenderResult chars={this.state.chars} rank={index+1} name={value.name} sim={value.val} about={value.about} traits={value.traits} version={this.props.ver} tab2={true} />
                    </div>
                ))}
                </MDBRow>
            </Container>
            </>
        );
    }
}

export default App;
