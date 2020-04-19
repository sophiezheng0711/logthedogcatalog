import React from 'react';
import Textbox from './Textbox';


class App extends React.Component {
      render() {
        return (
          <Textbox style={{backgroundColor: 'rgba(204, 204, 204, 0.3)' }} title="Dog Not Found" text="Our humble collection of dogs does not encompass the rare breed that you are seeking... 
          Perhaps consider donating to us any knowledge of this special species" />
        );
      }
}

export default App;
