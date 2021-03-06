import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { Row, Col} from 'react-bootstrap';
import SliderPieChart from './SliderPieChart';
import Paper from '@material-ui/core/Paper';

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
        return (
            <>
            {this.props.advanceSwitch &&
            <Paper elevation={3} style={{marginTop: '2em', padding: '1em', backgroundColor: 'rgba(50, 50, 50, 0.3)'}}>
            
                <Row>
                <Col style={{marginTop: '1em'}}>
                <Row>
                    <Col sm={3}>
                        <div style={{color: 'black', fontFamily: 'Anders', fontWeight: 'bold'}}>Breed</div>
                    </Col>
                    <Col>
                        <PrettoSlider defaultValue={this.props.breed} onChangeCommitted={this.props.changeBreed} step={1} min={0} max={10} valueLabelDisplay="auto" aria-label="1" />
                    </Col>
                </Row>
                <Row>
                    <Col sm={3}>
                        <div style={{color: 'black', fontFamily: 'Anders', fontWeight: 'bold'}}>Height</div>
                    </Col>
                    <Col>
                        <PrettoSlider defaultValue={this.props.height} onChangeCommitted={this.props.changeHeight} step={1} min={0} max={10} valueLabelDisplay="auto" aria-label="1" />
                    </Col>
                </Row>
                <Row>
                    <Col sm={3}>
                        <div style={{color: 'black', fontFamily: 'Anders', fontWeight: 'bold'}}>Weight</div>
                    </Col>
                    <Col>
                        <PrettoSlider defaultValue={this.props.weight} onChangeCommitted={this.props.changeWeight} step={1} min={0} max={10} valueLabelDisplay="auto" aria-label="1" />
                    </Col>
                </Row>
                <Row>
                    <Col sm={3}>
                        <div style={{color: 'black', fontFamily: 'Anders', fontWeight: 'bold'}}>Popularity</div>
                    </Col>
                    <Col sm={{span:7, offset: 2}}>
                        <PrettoSlider defaultValue={this.props.pop} onChangeCommitted={this.props.changePop} step={1} min={0} max={10} valueLabelDisplay="auto" aria-label="1" />
                    </Col>
                </Row>
                <Row>
                    <Col sm={3}>
                        <div style={{color: 'black', fontFamily: 'Anders', fontWeight: 'bold'}}>Personality</div>
                    </Col>
                    <Col sm={{span:7, offset: 2}}>
                        <PrettoSlider defaultValue={this.props.personality} onChangeCommitted={this.props.changePersonality} step={1} min={0} max={10} valueLabelDisplay="auto" aria-label="1" />
                    </Col>
                </Row>
                <Row>
                    <Col sm={3}>
                        <div style={{color: 'black', fontFamily: 'Anders', fontWeight: 'bold'}}>Behavior</div>
                    </Col>
                    <Col sm={{span:7, offset: 2}}>
                        <PrettoSlider defaultValue={this.props.behavior} onChangeCommitted={this.props.changeBehavior} step={1} min={0} max={10} valueLabelDisplay="auto" aria-label="1" />
                    </Col>
                </Row>
                </Col>
                <Col>
                <Row className="justify-content-md-center"><SliderPieChart breed={this.props.breed} height={this.props.height} weight={this.props.weight}
                pop={this.props.pop} personality={this.props.personality} behavior={this.props.behavior} /></Row>
                </Col>
              </Row>
            </Paper>}
            </>
        );
    }
}

export default App;
