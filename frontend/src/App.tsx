import Router from './views/Router';
import './App.css';
import MainAppBar from './components/MainAppBar';
import { ThemeProvider } from '@mui/material';
import UITheme from './utils/Theme';

function App() {
  return (
    <ThemeProvider theme={UITheme}>
      <MainAppBar />
      <Router />
    </ThemeProvider>
  )
}

export default App;
