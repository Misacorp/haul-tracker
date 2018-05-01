import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import HaulInput from './HaulInput';

function App() {
  return (
    <MuiThemeProvider>
      <HaulInput />
    </MuiThemeProvider>
  );
}

export default App;
