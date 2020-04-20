import React from 'react';
import {Modal} from 'react-bootstrap';


class App extends React.Component {
    
      render() {
        return (
            <Modal
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={this.props.show}
              onHide={this.props.close}
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" style={{fontFamily: 'Anders'}}>
                  {this.props.title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <img src={require('./dogpics/' + this.props.name + '.jpg')} height='300px' style={{objectFit: 'cover', display: 'block', 
                marginLeft: 'auto', marginRight: 'auto'}} alt='' />
                <p style={{marginTop: '1em'}}>
                  {this.props.body}
                </p>
              </Modal.Body>
            </Modal>
          );
      }
}

export default App;
