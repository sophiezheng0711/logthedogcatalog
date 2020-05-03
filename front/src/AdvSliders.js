import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { Container, Row, Col} from 'react-bootstrap';

const PrettoSlider = withStyles({
    root: {
      color: 'black',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

class App extends React.Component {
    render() {
        const classes = this.props;
        return (
            <>
            {this.props.advanceSwitch &&
                <Row className="justify-content-md-center">
                  <Container style={{marginTop: '3em'}}>
                    <Row>
                        <Col className={classes.root}>
                            <Row>
                                <Col sm={3}>
                                    <div style={{color: 'black', fontFamily: 'Anders', fontWeight: 'bold'}}>Breed</div>
                                </Col>
                                <Col>
                                    <PrettoSlider defaultValue={this.props.breed} onChangeCommitted={this.props.changeBreed} step={1} min={0} max={10} valueLabelDisplay="auto" aria-label="1" />
                                </Col>
                            </Row>
                        </Col>
                        <Col className={classes.root} sm={{offset:1}}>
                            <Row>
                                <Col sm={3}>
                                    <div style={{color: 'black', fontFamily: 'Anders', fontWeight: 'bold'}}>Height</div>
                                </Col>
                                <Col>
                                    <PrettoSlider defaultValue={this.props.height} onChangeCommitted={this.props.changeHeight} step={1} min={0} max={10} valueLabelDisplay="auto" aria-label="1" />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={classes.root}>
                            <Row>
                                <Col sm={3}>
                                    <div style={{color: 'black', fontFamily: 'Anders', fontWeight: 'bold'}}>Weight</div>
                                </Col>
                                <Col>
                                    <PrettoSlider defaultValue={this.props.weight} onChangeCommitted={this.props.changeWeight} step={1} min={0} max={10} valueLabelDisplay="auto" aria-label="1" />
                                </Col>
                            </Row>
                        </Col>
                        <Col className={classes.root} sm={{offset:1}}>
                            <Row>
                                <Col sm={3}>
                                    <div style={{color: 'black', fontFamily: 'Anders', fontWeight: 'bold'}}>Popularity</div>
                                </Col>
                                <Col sm={{span:7, offset: 2}}>
                                    <PrettoSlider defaultValue={this.props.pop} onChangeCommitted={this.props.changePop} step={1} min={0} max={10} valueLabelDisplay="auto" aria-label="1" />
                                </Col>
                            </Row>
                        </Col>
                      </Row>
                </Container>
                </Row>
              }
            </>
        );
    }
}

export default App;
