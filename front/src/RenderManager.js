import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import RenderResult from "./RenderResult";
import axios from 'axios';
import Loader from './Loader';
import { MDBRow } from "mdbreact";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.state = {
            // params: [], // params in the order of name, breed, height, weight, pop, personality
            result: [],
            loading: true,
            breed: '',
            height: '',
            weight: '',
            pop: '',
            personality: '',
        };
      }

      search() {
        const q = window.location.hash;
        const n = q.substring(9, q.length);
        const temp = n.split("&");
        setTimeout(function () {
            // axios.get('http://localhost:5000/api/search?' + n )
            axios.get('/api/search?' + n )
                .then((response) => {
                    console.log(response.data);
                if (response.data.length === 0) {
                window.location.replace(window.location.origin + "/#/notfound");
                }
                else {
                this.setState({loading: false, result:response.data});
                this.setState({
                    breed: temp[1].split("=")[1],
                    height: temp[2].split("=")[1],
                    weight: temp[3].split("=")[1],
                    pop: temp[4].split("=")[1],
                    personality: temp[5].split("=")[1],
                });
                }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }.bind(this), 1500);
    }

    render() {
        if (this.state.loading) {
            this.search();
            return <Loader />;
        }
        const rstList = this.state.result;
        var jsons = [];
        rstList.map((value) => (
            jsons.push(JSON.parse(value))
        ));
        const fin = jsons.slice(1, jsons.length);
        return (
            <>
            <Container>
                <p style={{color:'black', fontFamily: 'Anders', fontSize:'60px', backgroundColor: 'rgba(204, 204, 204, 0.5)'}}>&nbsp; {jsons[0].name} &nbsp;</p>
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
                </Container>
                <MDBRow style={{display: 'flex', flexWrap: 'wrap'}}>
                {fin.map((value, index) => (
                    <div style={{
                        lineHeight: '150px',
                        marginLeft: '2em',
                        flex: '1 0 auto',
                        overflow: 'auto'
                    }}>
                        <RenderResult rank={index+1} name={value.name} similarity={value.sim} popularity={value.pop} about={value.about} height={value.height}
                        weight={value.weight} personality={value.personality} tab2={false} 
                        loadingShow={() => this.setState({loading: true})} loadingHide={() => this.setState({loading: false})}
                        cbreed={this.state.breed} cheight={this.state.height} cweight={this.state.weight} cpop={this.state.pop}
                        cpers={this.state.personality} shorts={JSON.parse(value.shorts)} />
                    </div>
                ))}
                </MDBRow>
            </Container>
            </>
        );
    }
}

export default App;
