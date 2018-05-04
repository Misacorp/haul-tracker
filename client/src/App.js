import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import HaulInput from './HaulInput';

const styles = {
  main: {
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

function App() {
  return (
    <div style={styles.main} >
      <MuiThemeProvider>
        <HaulInput />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
