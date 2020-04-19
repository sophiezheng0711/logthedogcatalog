import React from 'react';
import {CardColumns, Container} from "react-bootstrap";
import RenderResult from "./RenderResult";
import axios from 'axios';
import Loader from './Loader';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.state = {
            name: null,
            result: [],
            loading: true
        };
      }

      search() {
        const q = window.location.hash;
        const n = q.substring(9, q.length);
        // axios.get('http://localhost:5000/api/search?name=' + n)
        axios.get('/api/search?name=' + n)
            .then((response) => {
            if (response.data.length === 0) {
              window.location.replace(window.location.origin + "/#/notfound");
            }
            else {
              this.setState({loading: false, result:response.data, name: decodeURI(n)});
            }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        if (this.state.loading) {
            this.search();
            return <Loader />;
        }
        const rstList = this.state.result;
        return (
            <>
            <Container>
                <p style={{color:'#1B4F72', fontFamily: 'Anders', fontSize:'60px', backgroundColor: 'rgba(204, 204, 204, 0.5)'}}>&nbsp; {this.state.name.toUpperCase()} &nbsp;</p>
                <CardColumns fluid="xs">
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
