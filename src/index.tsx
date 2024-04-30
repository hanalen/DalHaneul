import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/globals.css';
import App from './App';
import { store } from './store/Store';
import { Provider } from 'react-redux';
import { ErrorBoundary } from './ErrorBoundary';
import { GlobalDialogProvider } from './Dialogs/GlobalDialogProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ErrorBoundary>
      <GlobalDialogProvider>
        <App />
      </GlobalDialogProvider>
    </ErrorBoundary>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
