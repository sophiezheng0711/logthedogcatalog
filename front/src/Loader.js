import React from 'react';
import LoadingScreen from 'react-loading-screen';





const Loader = () => {
    return (



        <LoadingScreen
          loading={true}
          bgColor='#ebf5fb'
          spinnerColor='#9ee5f8'
          textColor='#d35400'
          //logoSrc='https://3.bp.blogspot.com/-KXzTR9sx2Yo/WEkhDiN-5NI/AAAAAAAL8zQ/jryC85TGQX0Vr1B3r3zRhgOHCEwGuqT0wCLcB/s1600/AW331857_00.gif'
          logoSrc='./loader.gif'
          text='Your dogs will show up in just a second!'
          >

        </LoadingScreen>
    );
}

export default Loader;
