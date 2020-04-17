import React, { Component } from 'react'
import axios from 'axios';
class ConnectAPI extends Component {

    constructor() {
        super();
        this.state = {
            result: 'pending'
        }
    }

    componentWillMount() {
        axios.get('api/hello')
            .then((response) => {
                this.setState(() => {
                    return { result: response.data }
                })
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        return <h1>{this.state.result}</h1>;
    }
}

export default ConnectAPI;