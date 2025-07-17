import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './components/theme/ThemeProvider';
import ToggleTheme from './components/theme/ToggleTheme';
import Home from './pages/Home';
import { store } from './redux/store';
export default function AppContainer() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <ToggleTheme />
          <Toaster />
          <Routes>
            <Route path='/' Component={Home} />
          </Routes>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}
