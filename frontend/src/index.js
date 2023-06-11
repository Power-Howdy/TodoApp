import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {DAppProvider, Rinkeby, Localhost} from "@usedapp/core";
import { getDefaultProvider } from 'ethers'

const root = ReactDOM.createRoot(document.getElementById('root'));
const config = {
    readOnlyChainId: Localhost.chainId,
    readOnlyUrls: {
      [Localhost.chainId]: 'http://127.0.0.1:8545',
    },
  }
// console.log(Localhost);

root.render(
    <React.StrictMode>
        <DAppProvider config={config}>
            <App/>
        </DAppProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
