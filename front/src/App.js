import React from 'react';
import Home from './Home';
import { HashRouter, Route } from 'react-router-dom';
import Navbar from './NavBar';
import {Container} from 'react-bootstrap';
import TextBox from './Textbox';
import RenderResult from './RenderManager';
import NotFound from './NotFoundPage';
import RenderResult2 from './RenderPersManager';

function AboutPage() {
  return (
    <Container>
      <TextBox title={<>About Log&#183;the&#183;Dog&#183;Catalog</>} text={ <><p>Sophie Zheng (sz374), Matthew Xu (mx68), Neil Sethi (ns784),
       Jakob Kaminsky (jk989), Yihe Zhang (yz2434)</p><p> Imagine that you’ve just graduated college and moved to a cool
        new apartment in California! You have a steady job, working 9-5, you come home, cook dinner for yourself, 
        and sit back on the couch watching television. There’s just one thing that's missing … a dog! But what breed 
        should you get? You know how big of a dog you’d want, how energetic you’d want it to be, in fact you just saw 
        your neighbor Greg walking his beagle the other day. You think to yourself, “I like beagles, but I wonder if 
        there are other breeds just like them.” Log The Dog Catalog is a personalized dog breed recommendation system 
        for both dog enthusiasts and prospective owners! The search system allows you to search for similar breeds to an 
        input example, perhaps a beagle, based on breed, height, weight, personality, and popularity.
       </p></>} />
    </Container>
  );
}

function NotFoundPage() {
  return (
    <NotFound />
  );
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {ver: 2};
    this.switchToV1 = this.switchToV1.bind(this);
    this.switchToV2 = this.switchToV2.bind(this);
  }

  switchToV1() {
    this.setState({ver: 1});
  }

  switchToV2() {
    this.setState({ver: 2});
  }

  render() {
    return (
      <>
      <HashRouter hashHistory>
        <div className='App'>
          <Container fluid>
            <Navbar switchToV1={this.switchToV1} switchToV2={this.switchToV2} version={this.state.ver} />
          </Container>
          <Route exact path='/' render={(props) => <Home {...props} ver={this.state.ver}/>} />
          <Route path='/home' render={(props) => <Home {...props} ver={this.state.ver}/>} />
          <Route path='/about' component={AboutPage} />
          <Route path='/search' render={(props) => <RenderResult {...props} ver={this.state.ver}/>} />
          <Route path='/personality' render={(props) => <RenderResult2 {...props} ver={this.state.ver}/>} />
          <Route path='/notfound' component={NotFoundPage} />
        </div>
      </HashRouter>

      </>
    );
  }
}


export default App;
