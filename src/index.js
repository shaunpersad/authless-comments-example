import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(React.createElement(App), document.getElementById('root'));
registerServiceWorker();