import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Libraries
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import LandingPage from './pages/LandingPage';

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<LandingPage />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
