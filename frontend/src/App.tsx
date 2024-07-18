import './App.css';
import { ThemeProvider } from '@mui/material';
import UITheme from './utils/Theme';
import PageLayout from './views/PageLayout';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={UITheme}>
        <PageLayout />
      </ThemeProvider>
    </Provider>
  )
}

export default App;
