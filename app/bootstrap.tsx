import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import 'app/styles/main.scss';
import 'src/scss/main.scss';
import 'src/scss/icons.scss';
import AppStatusProvider from './providers/AppStateProvider';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <AppStatusProvider>
        <App />
    </AppStatusProvider>
);
