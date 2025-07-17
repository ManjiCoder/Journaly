import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ThemeProvider } from './components/theme/ThemeProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { store } from './redux/store';
export default function AppContainer() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <Navbar />
          <Toaster />
          <Routes>
            <Route path='/' Component={Home} />
            <Route path='/login' Component={Login} />
            <Route path='/register' Component={SignUp} />
          </Routes>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}
