import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div id="ai-chat-root">
      <App />
    </div>
  </StrictMode>
);
