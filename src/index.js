import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Libraries
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionPage from './pages/TermsConditionPage';
import LandingPage from './pages/LandingPage';

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/wallet" element={<App />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-n-condition" element={<TermsConditionPage />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
