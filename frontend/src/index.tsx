import React from 'react';
import * as process from 'process';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import './index.css';

(window as any).global = window;
(window as any).process = process;
(window as any).Buffer = [];



const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

