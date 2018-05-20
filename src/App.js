import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PatientTable from './components/PatientTable'
import AppBar from '@material-ui/core/AppBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const theme = createMuiTheme({
  palette: {
    primary: { main: red[800] }, // Purple and green play nicely together.
  secondary: { main: grey[500] }, // This is just green.A700 as hex.
  },
});
const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" >
            Adam Robo Center - Atribuição de Resultados
          </Typography>
        
        </Toolbar>
      </AppBar>
          
      	<PatientTable/>
      </div>
     </MuiThemeProvider>
    );
  }
}

export default App;
