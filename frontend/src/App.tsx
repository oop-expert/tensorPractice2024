import './App.css';
import { ThemeProvider } from '@mui/material';
import UITheme from './utils/Theme';
import PageLayout from './views/PageLayout';

function App() {
  return (
    <ThemeProvider theme={UITheme}>
      <PageLayout />
    </ThemeProvider>
  )
}

export default App;
