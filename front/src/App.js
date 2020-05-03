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
        your neighbor Greg walking his beagle the other day. You think to yourself, “I like beagles but I wonder if 
        there are other breeds just like them.” Log The Analog Dog is a personalized dog breed recommendation system 
        for both dog enthusiasts and prospective owners! The search system allows you to search for similar breeds to an input example, perhaps a beagle, based on breed, height, weight, and popularity.
       </p></>} />
    </Container>
  );
}

function NotFoundPage() {
  return (
    <NotFound />
  );
}

function HomePage() {
  return (
    <Home />
  );
}

function SearchPage() {
  return (
    <RenderResult />
  );
}

function SearchPersPage() {
  return (
    <RenderResult2 />
  );
}

class App extends React.Component {

  render() {
    return (
      <>
      <HashRouter hashHistory>
        <div className='App'>
          <Container fluid>
            <Navbar />
          </Container>
          <Route exact path='/' component={HomePage} />
          <Route path='/home' component={HomePage} />
          <Route path='/about' component={AboutPage} />
          <Route path='/search' component={SearchPage} />
          <Route path='/personality' component={SearchPersPage} />
          <Route path='/notfound' component={NotFoundPage} />
        </div>
      </HashRouter>

      </>
    );
  }
}


export default App;
