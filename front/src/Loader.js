import React from 'react';
import LoadingScreen from 'react-loading-screen';





const Loader = () => {
    return (



        <LoadingScreen
          loading={true}
          bgColor='#ebf5fb'
          spinnerColor='#9ee5f8'
          textColor='#d35400'
          logoSrc='./loader.gif'
          text={<h3 style={{fontFamily:'Cubes', marginTop: '1em', color: '#d35400'}}>Woof...</h3>}
          >
            <></>
        </LoadingScreen>
    );
}

export default Loader;
