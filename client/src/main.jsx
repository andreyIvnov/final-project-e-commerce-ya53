import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './Helpers/Reducers/rootReducer';

import './index.css';
import App from './App.jsx';

const store = createStore(rootReducer);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>  
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
