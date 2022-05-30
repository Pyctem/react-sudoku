import React from 'react';
import ReactDOM from 'react-dom/client';
import CApp from './component/CApp';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<CApp />);
