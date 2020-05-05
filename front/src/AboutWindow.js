import React from 'react';
import {Modal, Row} from 'react-bootstrap';
import { Tag } from 'antd';
import "antd/dist/antd.css";


class App extends React.Component {
    
      render() {
        const tagColors = ["black", "#6F4016", "#416366", "#414966"];
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
                <Row className="justify-content-md-center">
                <Tag color={tagColors[Math.floor(Math.random() * tagColors.length)]} 
                        style={{fontWeight: 'bold', fontFamily: '"Lucida Console", Courier, monospace', marginTop: '0.5em', 
                        padding: '0.1em', fontSize: '14px'}}>
                          &nbsp;{"Height: " + this.props.shorts.height}&nbsp;</Tag>
                <Tag color={tagColors[Math.floor(Math.random() * tagColors.length)]} 
                        style={{fontWeight: 'bold', fontFamily: '"Lucida Console", Courier, monospace', marginTop: '0.5em', 
                        padding: '0.1em', fontSize: '14px'}}>
                          &nbsp;{"Weight: " + this.props.shorts.weight}&nbsp;</Tag>
                <Tag color={tagColors[Math.floor(Math.random() * tagColors.length)]} 
                        style={{fontWeight: 'bold', fontFamily: '"Lucida Console", Courier, monospace', marginTop: '0.5em', 
                        padding: '0.1em', fontSize: '14px'}}>
                          &nbsp;{"Traits: " + this.props.shorts.traits}&nbsp;</Tag>
                </Row>
                <p style={{marginTop: '1em'}}>
                  {this.props.body}
                </p>
              </Modal.Body>
            </Modal>
          );
      }
}

export default App;
