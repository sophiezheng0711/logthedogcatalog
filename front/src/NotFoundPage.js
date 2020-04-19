import React from 'react';
import Textbox from './Textbox';


class App extends React.Component {
      render() {
        return (
          <Textbox style={{backgroundColor: 'transparent' , fontFamily: 'Comic Sans MS'}} title="404 Not Found" text="Our humble collection of dogs does not encompass the rare breed that you are seeking... 
          Perhaps consider donating to us any knowledge of this special species" />
        );
      }
}

export default App;
