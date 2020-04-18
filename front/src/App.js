import React from 'react';
import Home from './Home';
import { HashRouter, Route } from 'react-router-dom';
import Navbar from './NavBar';
import {Container} from 'react-bootstrap';
import TextBox from './Textbox';
import RenderResult from './RenderManager';


function HomePage() {
  return (<Home/>);
}

function AboutPage() {
  return (
    <Container>
      <TextBox title="About Logtheanalogdog" text="Sophie Zheng (sz374), Matthew Xu (mx68), Neil Sethi (ns784),
       Jakob Kaminsky (jk989), Yihe Zhang (yz2434)// TODO replace" />
    </Container>
  );
}

function ResultsPage() {
  return (
    <RenderResult/>
  );
}

function App() {
  return (
    <>
    <HashRouter hashHistory>
      <div className='App'>
        <Container fluid>
          <Navbar />
        </Container>
        {/* <Switch> */}
        <Route exact path='/' component={HomePage} />
        <Route path='/home' component={HomePage} />
        <Route  path='/about' component={AboutPage} />
        <Route path='/search' component={ResultsPage} />
        {/* </Switch> */}
      </div>
    </HashRouter>

    </>
  );
}


export default App;
